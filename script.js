// localStorage.clear();
const
  menuBtn = document.getElementById('account-area'),
  menu = document.getElementById('menu'),
  localStorageKey = 'storedbookShelf',
  shelf = document.getElementById('shelf'),
  addBookBtn = document.getElementById('add-book'),
  clearBooksBtn = document.getElementById('clear-books'),
  myForm = document.getElementById('form'),
  formDiv = document.getElementById('form'),
  submitFormBtn = document.getElementById('submitform'),
  bookCard = document.getElementById('bookcard'),
  showAll   = document.querySelector('#showall tbody'),
  removeBtn = document.querySelector('#remove-book'),
  upBtn = document.querySelector('button.up'),
  downBtn = document.querySelector('button.down'),
  closeBookCard = document.querySelector('#bookcard .close'),
  closeForm = document.querySelector('#form .close'),
  bookShelf = JSON.parse( localStorage.getItem(localStorageKey) || '[]' ),
  booksElms = [];

let editingIndex = null;

///// OPEN & CLOSE FORM /////

addBookBtn.addEventListener('click', () => {
  formDiv.classList.add('show');
  bookCard.classList.remove('show');
  document.getElementById('booktitle').focus();
});

closeForm.addEventListener('click', () => {
  formDiv.classList.remove('show');
});

closeBookCard.addEventListener('click', () => {
  bookCard.classList.remove('show');
});
/////     /////

///// CREATE RANDOM COLOUR AND SIZE /////

function randomColor() {
   const hue = Math.floor(Math.random() * 360);
  const saturation = 30 + Math.floor(Math.random() * 20);
  const lightness = 75 + Math.floor(Math.random() * 15);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function getNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

///// STORE BOOK DETAILS /////

function BookDetails(title, author, pages, pagesread, notes, completed, recommended, rating, color, width, height){
          this.title = title,
          this.author = author,
          this.pages = pages,
          this.pagesread = pagesread,
          this.notes = notes,
          this.completed = completed,
          this.recommended = recommended,
          this.rating = rating,
          this.color = color,
          this.width = width,
          this.height = height
      };

///// ADD BOOK ELEMENT TO SHELF /////

function addBookFnc(bookObj, index) {
  let bookBlock = document.createElement('div');
  let book = document.createElement('div');
  let bTitle = document.createElement('p');

  bookBlock.classList.add('bookblock');
  book.classList.add('book');
  book.style.backgroundColor = bookObj.color;
  book.style.height = bookObj.height + 'px';
  book.style.width = bookObj.width + 'px';
  

  if (bookObj.title) {
    bTitle.textContent = bookObj.title;
    bTitle.style.backgroundColor = '#fff';
  }
    
    shelf.appendChild(bookBlock);
    bookBlock.appendChild(book);
    book.appendChild(bTitle);
    booksElms.push(bookBlock);

    bookBlock.addEventListener('click', () => openBookCard(bookObj, index));

  }

  if (bookShelf.length > 0) {
  bookShelf.forEach((bookObj, i) => addBookFnc(bookObj, i));
}

  function addBookForm() {
    let hasEmptyBook = false;

    booksElms.forEach(book => {
    // set value if empty
      if (book.textContent == ''){
        book.textContent = myForm.booktitle.value;
        hasEmptyBook = true;
      }
    });

    if (hasEmptyBook === false) return '';
  }

///// OPEN BOOK CARD /////

function openBookCard(book, index) {
      
    bookCard.classList.add('show');
    let titleSpace = document.querySelector('h3.title');
    let authorSpace = document.querySelector('p.author');
    let pagesSpace = document.querySelector('span.pages');
    let pagesReadSpace = document.querySelector('span.pagesread');
    let notesSpace = document.querySelector('span.notes');
    let completedSpace = document.querySelector('div.completed p');
    let recommendedSpace = document.querySelector('div.recommended p');
    let ratingSpace = document.querySelector(".rating-display .stars");

    
    titleSpace.innerHTML = book.title;
    authorSpace.innerHTML = book.author;
    pagesSpace.innerHTML = book.pages;
    pagesReadSpace.innerHTML = book.pagesread;
    notesSpace.innerHTML = book.notes;
    ratingSpace.innerHTML = " " + "★".repeat(book.rating) + "☆".repeat(5 - book.rating);
    let completedValue = book.completed;
    let recommendedValue = book.recommended;

    const pagesLeft = book.pages - book.pagesread;

    if (completedValue == true){
      completedSpace.innerHTML = 'You have completed this book.';
    } else {
      completedSpace.innerHTML = 'You have not yet completed this book. You have ' + pagesLeft + ' pages left';
    }
  
    if (recommendedValue == true){
      recommendedSpace.innerHTML = "You would recommend this book.";
    } else {
      recommendedSpace.innerHTML = "";
    }

    let updateBtn = document.querySelector("#bookcard button");

  updateBtn.replaceWith(updateBtn.cloneNode(true)); // clear old listeners
  updateBtn = document.querySelector("#bookcard button");

  updateBtn.addEventListener("click", () => {
  editingIndex = index;

  document.querySelector("#form h2").textContent = "Editing  " + book.title;
  document.getElementById("booktitle").value = book.title;
  document.getElementById("author").value = book.author;
  document.getElementById("pages").value = book.pages;
  document.getElementById("pagesread").value = book.pagesread;
  document.getElementById("notes").value = book.notes;
  document.getElementById("completed").checked = book.completed;
  document.getElementById("recommended").checked = book.recommended;

});

    //// REMOVE BOOK /////

    removeBtn.style.display = 'inline-block';

    removeBtn.style.display = 'inline-block';
    removeBtn.onclick = () => {
    document.querySelectorAll('.book')[index].remove();
    bookShelf.splice(index, 1);
    updateStorage();
    window.location.reload(); 
  };
};

///// STAR RATING LOGIC /////
const stars = document.querySelectorAll("#stars span");
const ratingInput = document.getElementById("rating");

stars.forEach(star => {
  star.addEventListener("mouseover", () => {
    resetStars();
    highlightStars(star.dataset.value);
  });

  star.addEventListener("mouseout", () => {
    resetStars();
    highlightStars(ratingInput.value);
  });

  star.addEventListener("click", () => {
    ratingInput.value = star.dataset.value;
    resetStars();
    highlightStars(ratingInput.value);
  });
});

function resetStars() {
  stars.forEach(star => star.classList.remove("selected", "hover"));
}

function highlightStars(rating) {
  stars.forEach(star => {
    if (star.dataset.value <= rating) {
      star.classList.add("selected");
    }
  });
}


///// FORM SUBMIT /////
myForm.addEventListener('submit', e => {

  e.preventDefault();

  let title = document.getElementById("booktitle").value;
  let author = document.getElementById("author").value;
  let pages =  Number(document.getElementById("pages").value);
  let pagesread = Number(document.getElementById("pagesread").value);
  let notes = document.getElementById("notes").value;
  let completed = document.getElementById("completed").checked;
  let recommended = document.getElementById("recommended").checked;
  let rating = document.getElementById("rating").value;
  
  let pagesReadInput = document.getElementById("pagesread");
  pagesReadInput.setCustomValidity("");

  if (pagesread > pages) {
    pagesReadInput.setCustomValidity("The pages read cannot be greater than the total pages.");
    pagesReadInput.reportValidity(); 
    return; 
  }

  if (pages == pagesread) {
    completed = true;
  }

  let color, width, height;

  if (editingIndex !== null) {
    // keep original style
    let oldBook = bookShelf[editingIndex];
    color = oldBook.color;
    width = oldBook.width;
    height = oldBook.height;

    bookShelf[editingIndex] = new BookDetails(
      title, author, pages, pagesread, notes, completed, recommended, rating, color, width, height
    );

    updateStorage();
    window.location.reload(); // refresh UI
    editingIndex = null;

    } else {
    // new book
      color = randomColor();
      width = getNumber(25, 45);
      height = getNumber(70, 150);

      let newBook = new BookDetails(
        title, author, pages, pagesread, notes, completed, recommended, rating, color, width, height
      );

      bookShelf.push(newBook);
      addBookFnc(newBook, bookShelf.length - 1);
      updateStorage();
    }

    formDiv.classList.remove("show");
    myForm.reset();
  });

  ///// LIVE VALIDATION /////
document.getElementById("pagesread").addEventListener("input", () => {
  let pagecount = Number(document.getElementById("pages").value);
  let pageread = Number(document.getElementById("pagesread").value);
  let pageReadInput = document.getElementById("pagesread");

  if (pageread > pagecount) {
    pageReadInput.setCustomValidity("The pages read cannot be greater than the total pages.");
  } else {
    pageReadInput.setCustomValidity(""); // clears error immediately
  }
});

/////    /////

function updateStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify( bookShelf ));
}





