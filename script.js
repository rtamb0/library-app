const myLibrary = [];

myLibrary.showLibrary = function() {
    this.forEach((book) => {
        createCard(book);
    });
};

myLibrary.addBookToLibrary = function(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
};

function createCard(book) {
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
};

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
};

myLibrary.addBookToLibrary('20th Century Boys', 'Naoki Urasawa', '5000', 'No');

myLibrary.addBookToLibrary('Fate Stay/Night', 'TYPE-MOON', '10000', 'No');

// Display the library on page
myLibrary.showLibrary();

const dialog = {
    bookDialog: document.querySelector('#dialog'),
    addButton: document.querySelector('#newbook'),
    confirmButton: document.querySelector('.book-buttons button:nth-child(1)'),
    cancelButton: document.querySelector('.book-buttons button:nth-child(2)'),
    addBookFromDialog: function() {
        const book = new Book(this.dialogTitle.value, this.dialogAuthor.value, this.dialogPages.value, this.dialogRead());
        createCard(book);
        myLibrary.push(book);
    },
};

// Show the dialog
dialog.addButton.addEventListener('click', () => dialog.bookDialog.showModal());

const dialogInputs = {
    dialogTitle: document.querySelector('#title'),
    dialogAuthor: document.querySelector('#author'),
    dialogPages: document.querySelector('#pages'),
    dialogRead: function() {
        const readYes = document.querySelector('#readyes');
        const readNo = document.querySelector('#readno');
        if (readYes.checked === true) return readYes.value;
        if (readNo.checked === true) return readNo.value;
    },
};

// Add Book from dialog inputs
dialog.confirmButton.addEventListener('click', dialog.addBookFromDialog.bind(dialogInputs));