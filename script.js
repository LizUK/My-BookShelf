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

  
///// OPEN MENU /////

menuBtn.addEventListener('mouseover', () => {
  menu.classList.remove('no-display');
});

menuBtn.addEventListener('mouseout', () => {
  menu.classList.add('no-display');
});

/////     /////



///// OPEN FORM /////

addBookBtn.addEventListener('click', () => {
  formDiv.classList.remove('no-display');
  document.getElementById('booktitle').focus();
});

/////     /////


///// ADD BOOK ELEMENT TO SHELF /////

function addBookFnc(title) {
  let book = document.createElement('div'); 
  let bTitle = document.createElement('p');
  var x = Math.round(0xffffff * Math.random()).toString(16);
  var y = (6-x.length);
  var z = '000000';
  var z1 = z.substring(0,y);
  var color = '#' + z1 + x;

  function getNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  var bookHeight = getNumber(70, 150);
  var bookWidth = getNumber(25, 45);

    book.classList.add('book');
    book.style.backgroundColor = color;
    book.style.height = bookHeight + 'px';
    book.style.width = bookWidth + 'px';

    if (title) {
  
      bTitle.textContent = title;
      bTitle.style.backgroundColor = '#fff';
    }
    
    shelf.appendChild(book);
    book.appendChild(bTitle);
    booksElms.push(book);
  }

  if (bookShelf) {
    bookShelf.forEach(book => {
      addBookFnc(book?.title);
      
    });
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


/////    /////

///// STORE BOOK DETAILS /////

function BookDetails(title, author, pages, pagesread, completed, recommended){
          this.title = title,
          this.author = author,
          this.pages = pages,
          this.pagesread = pagesread,
          this.completed = completed,
          this.recommended = recommended
      }

function updateBookShelf() {

  let title = document.getElementById("booktitle").value;
  let author = document.getElementById("author").value;
  let pages =  document.getElementById("pages").value;
  let pagesread = document.getElementById("pagesread").value;
  let completed = document.getElementById("completed").checked;
  let recommended = document.getElementById("recommended").checked;

  ///// CHECK PAGES VS PAGES READ /////

  if (pages == pagesread) {
    completed = true;
  }

  let newBook = new BookDetails(title, author, pages, pagesread, completed, recommended);

  bookShelf.push(newBook);

}


myForm.addEventListener('submit', e =>

{

addBookFnc();
updateBookShelf();
addBookForm();

formDiv.classList.add('no-display');
// myForm.reset();

updateStorage();

});

/////    /////

///// OPEN BOOK CARD /////

var books = document.querySelectorAll('.book');
for (let b = 0; b < books.length; b++) {

  books[b].addEventListener('click' , function() {
      
    bookCard.classList.remove('no-display');
    let book = bookShelf[b];
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



    /////     /////


    if (completedValue == true){
      completedSpace.innerHTML = 'You have completed this book.';
    } else {
      completedSpace.innerHTML = 'You have not yet completed this book.';
    }
  
    if (recommendedValue == true){
      recommendedSpace.innerHTML = "You would recommend this book.";
    } else {
      recommendedSpace.innerHTML = "";
    }



    //// REMOVE BOOK /////

    removeBtn.style.display = 'inline-block';

    function removeBook() {
      books[b].remove();
      let bookIndex = bookShelf.findIndex(x => x.title === book.title)
      if (bookIndex >= 0)
        bookShelf.splice(bookIndex, 1);

      updateStorage();
      window.location.reload();

    }
      
      removeBtn.onclick = () => removeBook();

      updateStorage();
  })
};


/////    /////

function updateStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify( bookShelf ));
}


console.log(bookShelf)


