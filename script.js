const container = document.getElementById("container");
const dialog = document.querySelector("dialog");
const modalActivationButton = document.getElementById("newbook-button");
const newBookCloseButton = document.getElementById("newbook-close");

const newBookTitle = document.getElementById("book-title");
const newBookAuthor = document.getElementById("book-author");
const newBookPages = document.getElementById("book-pages");
const newBookLanguage = document.getElementById("book-language");
const newBookRating = document.getElementById("book-rating");
const newBookReadStatus = document.getElementById("book-readStatus");
const newBookAdd = document.getElementById("newbook-submit");

const myLibrary = [
    {
        title: "The Hunger Games",
        author: "Suzanne Collins",
        numberOfPages: 374,
        language: "English",
        rating: 5,
        readStatus: true,
    },
    {
        title: "Catching Fire",
        author: "Suzanne Collins",
        numberOfPages: 391,
        language: "English",
        rating: 5,
        readStatus: true,
    },
    {
        title: "Mockingjay",
        author: "Suzanne Collins",
        numberOfPages: 390,
        language: "English",
        rating: 4,
        readStatus: true,
    },
    {
        title: "Charlotte's Web",
        author: "E.B. White",
        numberOfPages: 192,
        language: "English",
        rating: 5,
        readStatus: true,
    },  
];


function displayBooks() {
    container.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const newBookCard = createBookCard(i);
        container.appendChild(newBookCard);
    }
}


function createBookCard(bookNumber) {
    const newBookCard = document.createElement("div");
    const bookTitle = document.createElement("p");
    bookTitle.textContent = "Name: " + myLibrary[bookNumber].title;
    bookTitle.style.fontWeight = "900";
    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = "Author: " + myLibrary[bookNumber].author;
    const bookPages = document.createElement("p");
    bookPages.textContent = "Pages: " + myLibrary[bookNumber].numberOfPages;
    const bookLanguage = document.createElement("p");
    bookLanguage.textContent = "Language: " + myLibrary[bookNumber].language;
    const bookRating = document.createElement("p");
    bookRating.textContent = "Rating: " + myLibrary[bookNumber].rating;
    const bookReadStatus = document.createElement("button");
    bookReadStatus.setAttribute('id',bookNumber);
    if (myLibrary[bookNumber].readStatus) {
        bookReadStatus.textContent = "Read";
        bookReadStatus.style.backgroundColor = "green";
    }
     else {
        bookReadStatus.textContent = "Not Read";
        bookReadStatus.style.backgroundColor = "red";
    }

    bookReadStatus.addEventListener("click", () => ReadStatusChanger(bookNumber));
    const removeBook = document.createElement("button");
    removeBook.textContent = "Remove";
    removeBook.addEventListener("click", () => BookRemover(bookNumber));
    newBookCard.append(bookTitle, bookAuthor, bookPages, bookLanguage, bookRating, bookReadStatus, removeBook);  
    return newBookCard; 
}

function ReadStatusChanger(bookNumber) {
    myLibrary[bookNumber].readStatus = !myLibrary[bookNumber].readStatus;
    displayBooks();
}

function BookRemover(bookNumber) {
    const temp = myLibrary.splice(bookNumber, 1);
    displayBooks();
}

function addBookToLibrary() {
    myLibrary[myLibrary.length] = {
        id: myLibrary.length + 1,
        title: newBookTitle.value,
        author: newBookAuthor.value,
        numberOfPages: newBookPages.value,
        language: newBookLanguage.value,
        rating: newBookRating.value,
        readStatus: newBookReadStatus.checked,
    }
    displayBooks();
}

function clearFields() {
    newBookTitle.value = "";
    newBookAuthor.value = "";
    newBookPages.value = "";
    newBookLanguage.value = "";
    newBookRating.value = "";
    newBookReadStatus.checked = false;
}

//Code for modal dialog

modalActivationButton.addEventListener("click", () => {
    dialog.showModal();
});

newBookCloseButton.addEventListener("click", () => {
    dialog.close();
    clearFields();
});

newBookAdd.addEventListener("click", () => {
    addBookToLibrary();
    dialog.close();
    event.preventDefault();    
    clearFields();
});

displayBooks();
