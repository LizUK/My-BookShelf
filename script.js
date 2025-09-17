// localStorage.clear();
const
  menuBtn = document.getElementById('account-area'),
  menu = document.getElementById('menu'),
  localStorageKey = 'storedbookShelf',
  shelf = document.getElementById('shelf'),
  addBookBtn = document.getElementById('add-book'),
  clearBooksBtn = document.getElementById('clear-books'),
  myForm = document.getElementById('form'),
  formDiv = document.getElementById('formcontainer'),
  submitFormBtn = document.getElementById('submitform'),
  bookCard = document.getElementById('bookcard'),
  showAll   = document.querySelector('#showall tbody'),
  removeBtn = document.querySelector('#remove-book'),
  upBtn = document.querySelector('button.up'),
  downBtn = document.querySelector('button.down'),
  bookShelf = JSON.parse( localStorage.getItem(localStorageKey) || '[]' ),
  booksElms = [];

///// OPEN FORM /////

addBookBtn.addEventListener('click', () => {
  formDiv.classList.remove('no-display');
  document.getElementById('booktitle').focus();
});

/////     /////



///// CREATE RANDOM COLOUR AND SIZE /////

function randomColor() {
  var x = Math.round(0xffffff * Math.random()).toString(16);
  var y = (6 - x.length);
  var z = '000000';
  var z1 = z.substring(0, y);
  return '#' + z1 + x;
}

function getNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

///// STORE BOOK DETAILS /////

function BookDetails(title, author, pages, pagesread, completed, recommended, color, width, height){
          this.title = title,
          this.author = author,
          this.pages = pages,
          this.pagesread = pagesread,
          this.completed = completed,
          this.recommended = recommended,
          this.color = color,
          this.width = width,
          this.height = height
      };

///// ADD BOOK ELEMENT TO SHELF /////

function addBookFnc(bookObj, index) {
  let book = document.createElement('div');
  let bTitle = document.createElement('p');

  book.classList.add('book');
  book.style.backgroundColor = bookObj.color;
  book.style.height = bookObj.height + 'px';
  book.style.width = bookObj.width + 'px';

  if (bookObj.title) {
    bTitle.textContent = bookObj.title;
    bTitle.style.backgroundColor = '#fff';
  }
    
    shelf.appendChild(book);
    book.appendChild(bTitle);
    booksElms.push(book);

    book.addEventListener('click', () => openBookCard(bookObj, index));

  }

  if (bookShelf.length > 0) {
  bookShelf.forEach(bookObj => addBookFnc(bookObj));
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
      
    bookCard.classList.remove('no-display');
    let titleSpace = document.querySelector('h3.title');
    let authorSpace = document.querySelector('p.author');
    let pagesSpace = document.querySelector('span.pages');
    let pagesReadSpace = document.querySelector('span.pagesread');
    let completedSpace = document.querySelector('div.completed p');
    let recommendedSpace = document.querySelector('div.recommended p');
    
    titleSpace.innerHTML = book.title;
    authorSpace.innerHTML = book.author;
    pagesSpace.innerHTML = book.pages;
    pagesReadSpace.innerHTML = book.pagesread;
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

    //// REMOVE BOOK /////

    removeBtn.style.display = 'inline-block';

    removeBtn.style.display = 'inline-block';
  removeBtn.onclick = () => {
    document.querySelectorAll('.book')[index].remove();
    bookShelf.splice(index, 1);
    updateStorage();
    window.location.reload(); // refresh UI
  };
};

///// FORM SUBMIT /////
myForm.addEventListener('submit', e => {

  e.preventDefault();

  let title = document.getElementById("booktitle").value;
  let author = document.getElementById("author").value;
  let pages =  document.getElementById("pages").value;
  let pagesread = document.getElementById("pagesread").value;
  let completed = document.getElementById("completed").checked;
  let recommended = document.getElementById("recommended").checked;


  if (pages == pagesread) {
    completed = true;
  }

  let color = randomColor();
  let width = getNumber(25, 45);
  let height = getNumber(70, 150);

  let newBook = new BookDetails(title, author, pages, pagesread, completed, recommended, color, width, height);

  bookShelf.push(newBook);

addBookFnc(newBook, bookShelf.length - 1);

updateStorage();

formDiv.classList.add('no-display');
myForm.reset();

});

/////    /////

function updateStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify( bookShelf ));
}


