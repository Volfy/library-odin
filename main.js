let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}
Book.prototype.getInfo = function () {
    let readString = "";
    if(this.read) {
        readString = "already read";
    }
    else {
        readString = "not read yet"
    }
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readString}`;
};

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
console.log(theHobbit.getInfo());

addBookToLibrary(theHobbit);

console.log(myLibrary)