const myLibrary = [];
myLibrary.showLibrary = function() {
    this.forEach((book) => {
        console.log(book);
    });
};

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
};

const book1 = new Book('20th Century Boys', 'Naoki Urasawa', '5000', 'In-Between');
myLibrary.push(book1);

const book2 = new Book('Fate Stay/Night', 'TYPE-MOON', '10000', 'No');
myLibrary.push(book2);

function addBookToLibrary(title, author, pages, read) {
    const name = new Book(title, author, pages, read);
    myLibrary.push(name);
};