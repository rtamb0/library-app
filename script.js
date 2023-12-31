const myLibrary = [];

myLibrary.showLibrary = function() {
    this.forEach((book) => {
        card.createCard(book);
    });
    card.removeCard();
};

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    };
    readStatus() {
        if (this.read === "Yes") {
            this.read = "No";
        } else {
            this.read = "Yes";
        };
    };
};

myLibrary.addBookToLibrary = function(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    return book;
};

const card = {
    createCard: function(book) {
        const library = document.querySelector('.library');
        // Creates the book card
        const bookCard = document.createElement('p');
        bookCard.classList.add('book');
        if (library.contains(library.querySelector('.book'))) {
            library.insertBefore(bookCard, library.querySelector('.book'));
        } else {
            library.appendChild(bookCard);
        };
        // Links the book index with the book card
        bookCard.dataset.indexNumber = myLibrary.indexOf(book);
        // Creates the title
        const titleText = document.createElement('h3');
        titleText.innerHTML = `${book.title}`;
        bookCard.appendChild(titleText);
        // Creates the author text
        const authorText = document.createElement('p');
        authorText.innerHTML = `<strong>Made by:</strong> ${book.author}`;
        bookCard.appendChild(authorText);
        // Creates the pages count text
        const pagesText = document.createElement('p');
        pagesText.innerHTML = `<strong>Pages:</strong> ${book.pages}`;
        bookCard.appendChild(pagesText);
        // Creates the toggle read button
        const toggleRead = document.createElement('button');
        toggleRead.classList.add('toggle-read');
        if (book.read === "Yes") toggleRead.classList.add('read-yes');
        toggleRead.innerHTML = `<strong>Read?</strong> ${book.read}`;
        toggleRead.addEventListener('click', function() {
            book.readStatus();
            if (book.read === "Yes") {
                this.classList.add('read-yes');
            } else {
                this.classList.remove('read-yes');
            };
            this.innerHTML = `<strong>Read?</strong> ${book.read}`;
        });
        bookCard.appendChild(toggleRead);
    },
    removeCard: function() {
        const bookCards = document.querySelectorAll('.book');
        bookCards.forEach((bookCard) => {
            const removeButton = document.createElement('button');
            removeButton.classList.add('remove');
            removeButton.innerHTML = "Remove";
            removeButton.dataset.indexNumber = bookCard.dataset.indexNumber;
            // Removes the remove button on existing card and replace it with a new one with new querySelectorAll reference
            if (bookCard.lastElementChild === bookCard.querySelector('button.remove')) bookCard.lastElementChild.remove();
            bookCard.appendChild(removeButton);
            removeButton.addEventListener('click', () => {
                myLibrary.splice(removeButton.dataset.indexNumber, 1);
                bookCards.forEach((bookCard) => {
                    if (removeButton.dataset.indexNumber < bookCard.dataset.indexNumber) {
                        bookCard.dataset.indexNumber -= 1;
                        // Refers to the bookCard remove buttons in this iteration
                        bookCard.lastElementChild.dataset.indexNumber -= 1;
                    };
                });
                bookCard.remove();
                // Displays text when there are no more cards left
                const library = document.querySelector('.library');
                if (library.contains(library.querySelector('.book')) === false) {
                    const reminderText = document.createElement('h2');
                    reminderText.classList.add('reminder-text');
                    reminderText.innerHTML = "A bit empty here don't you think? Create a new book entry!";
                    library.parentNode.appendChild(reminderText);
                };
            });
        });
    },
};

// Display the library on page
myLibrary.showLibrary();

const dialog = {
    bookDialog: document.querySelector('#dialog'),
    dialogForm: document.querySelector('#dialog form'),
    addButton: document.querySelector('#newbook'),
    confirmButton: document.querySelector('.book-buttons button:nth-child(1)'),
    cancelButton: document.querySelector('.book-buttons button:nth-child(2)'),
};

// Show the dialog
dialog.addButton.addEventListener('click', (event) => {
    event.preventDefault();
    dialog.bookDialog.showModal();
});

// Close the dialog
dialog.cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    dialog.bookDialog.close();
});

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

function addBookFromDialog() {
    if (dialogInputs.dialogTitle.value === '' || dialogInputs.dialogAuthor.value === '' || dialogInputs.dialogRead() === undefined) return;
    if (dialogInputs.dialogPages.value === '') {
        dialogInputs.dialogPages.type = 'text';
        dialogInputs.dialogPages.value = "Unknown";
    }
    const book = myLibrary.addBookToLibrary(dialogInputs.dialogTitle.value, dialogInputs.dialogAuthor.value, dialogInputs.dialogPages.value, dialogInputs.dialogRead());
    if (dialogInputs.dialogPages.type === 'text') dialogInputs.dialogPages.type = 'number';
    card.createCard(book);
    card.removeCard();
};

// Add Book from dialog inputs
dialog.confirmButton.addEventListener('click', (event) => {
    event.preventDefault();
    dialog.dialogForm.reportValidity()
    // Removes the text that displays when there are no more cards left
    const libraryContainer = document.querySelector('.library-container');
    if (libraryContainer.contains(libraryContainer.querySelector('.reminder-text')) === true) {
        libraryContainer.querySelector('.reminder-text').remove();
    };
    addBookFromDialog();
    if (dialog.dialogForm.checkValidity() === true) {
        dialog.bookDialog.close();
        dialog.dialogForm.reset();
    };
});