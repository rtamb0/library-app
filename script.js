const myLibrary = [];
myLibrary.showLibrary = function() {
    this.forEach((book) => {
        const library = document.querySelector('.library');
        const bookCard = document.createElement('div');
        bookCard.classList.add('book');
        library.appendChild(bookCard);
        const titleText = document.createElement('h3');
        titleText.innerHTML = `${book.title}`;
        bookCard.appendChild(titleText);
        const authorText = document.createElement('p');
        authorText.innerHTML = `<strong>Made by:</strong> ${book.author}`;
        bookCard.appendChild(authorText);
        const pagesText = document.createElement('p');
        pagesText.innerHTML = `<strong>Pages:</strong> ${book.pages}`;
        bookCard.appendChild(pagesText);
        const readText = document.createElement('p');
        readText.innerHTML = `<strong>Read?</strong> ${book.read}`;
        bookCard.appendChild(readText);
    });
};

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
};

const book1 = new Book('20th Century Boys', 'Naoki Urasawa', '5000', 'No');
myLibrary.push(book1);

const book2 = new Book('Fate Stay/Night', 'TYPE-MOON', '10000', 'No');
myLibrary.push(book2);

function addBookToLibrary(title, author, pages, read) {
    const name = new Book(title, author, pages, read);
    myLibrary.push(name);
};

myLibrary.showLibrary();

const dialog = {
    bookDialog: document.querySelector('#dialog'),
    addButton: document.querySelector('#newbook'),
    confirmButton: document.querySelector('.book-buttons button:nth-child(1)'),
    cancelButton: document.querySelector('.book-buttons button:nth-child(2)'),
    showDialog: function() {
        this.addButton.addEventListener('click', () => this.bookDialog.showModal());
    },
};

dialog.showDialog();

const dialogInputs = {
    dialogTitle: document.querySelector('#title'),
    dialogAuthor: document.querySelector('#author'),
    dialogPages: document.querySelector('#pages'),
    dialogRead: [document.querySelector('#readyes'), document.querySelector('#readno')],
};

confirmButton.addEventListener('click', () => {

})