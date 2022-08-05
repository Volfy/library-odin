let myLibrary = [];
const table = document.querySelector(".library-table tbody");
const addBookBtn = document.querySelector('.add-book');
const addBookForm = document.querySelector('.add-book-form');
let ranFlag = false;
let tableLength = 0;

addBookBtn.addEventListener('click', addBook);
addBookForm.addEventListener('submit', () => {
    event.preventDefault();
    addBookToLibrary(
    new Book(
        document.querySelector('#title-input').value,
        document.querySelector('#author-input').value,
        document.querySelector('#pages-input').value,
        document.querySelector('#read-input').checked ));
        displayBooks();
        addBookForm.style.cssText= "display: none;";
    });


// const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
// const mangaGuide = new Book('The Manga Guide to WebDev', 'Fake Name', 200, true);
// addBookToLibrary(theHobbit);
// addBookToLibrary(mangaGuide);

class Book {

    constructor(title, author, pages, read) {
        this._title = title
        this._author = author
        this._pages = pages
        this._read = read
    }
    get Info() {
        let readString = "";
        if(this.read) {
            readString = "already read";
        }
        else {
            readString = "not read yet"
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readString}`;
    }

    get title() {
        return this._title;
    }
    get author() {
        return this._author;
    }
    get pages() {
        return this._pages;
    }
    get read() {
        return this._read;
    }
    
    set title(title) {
        this._title = title;
    }
    set author(author) {
        this._author = author;
    }
    set pages(pages) {
        this._pages = pages;
    }
    set read(read) {
        this._read = read;
    }
}




function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks () {
    if(ranFlag){
        for (i=0; i<tableLength; i++) {
            table.deleteRow(-1);
        }
    }
    
    myLibrary.forEach((book) => {
        let row = table.insertRow();
        let cellTitle = row.insertCell(0);
        let cellAuthor = row.insertCell(1);
        let cellPages = row.insertCell(2);
        let cellRead = row.insertCell(3);
        let cellDelete = row.insertCell(4);
        cellDelete.classList += "del-btn cent";
        cellRead.classList += "cent";
        cellPages.classList += "cent";

        cellTitle.textContent = book.title;
        cellAuthor.textContent = book.author;
        cellPages.textContent = book.pages;
        cellRead.innerHTML = book.read ? '<input type="checkbox" id="read-table" data-numr="'+myLibrary.indexOf(book)+'" checked>' : '<input type="checkbox" data-numr="'+myLibrary.indexOf(book)+'" id="read-table">';
        cellDelete.innerHTML = "<button class='rmv-book' data-num='"+myLibrary.indexOf(book)+"'>Delete</button>";
        document.querySelector('[data-num="'+myLibrary.indexOf(book)+'"]').addEventListener('click', removeBook);
    })
    document.querySelectorAll("#read-table").forEach( (check) => {
        check.addEventListener("change", changeRead);
    });
    ranFlag = true;
    tableLength = myLibrary.length;
}

function addBook () {
    addBookForm.style.cssText= "display: block;";
}

function removeBook () {
    let index = this.dataset.num;
    myLibrary.splice(index, 1);
    displayBooks();
}

function changeRead () {
    if (this.checked) {
        myLibrary[this.dataset.numr].read = true;
    } else {myLibrary[this.dataset.numr].read = false;}
}

