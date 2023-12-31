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

const myLibrary = [];

class Book {
  constructor(title, author, numberOfPages, language, rating, readStatus) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.language = language;
    this.rating = rating;
    this.readStatus = readStatus;
  }

  displayBooks() {
    container.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
      const newBookCard = this.createBookCard(i);
      container.appendChild(newBookCard);
    }
  }

  createBookCard(bookNumber) {
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
    bookReadStatus.setAttribute('id', bookNumber);
    if (myLibrary[bookNumber].readStatus) {
      bookReadStatus.textContent = "Read";
      bookReadStatus.style.backgroundColor = "green";
    }
    else {
      bookReadStatus.textContent = "Not Read";
      bookReadStatus.style.backgroundColor = "red";
    }

    bookReadStatus.addEventListener("click", () => this.ReadStatusChanger(bookNumber));
    const removeBook = document.createElement("button");
    removeBook.textContent = "Remove";
    removeBook.addEventListener("click", () => this.BookRemover(bookNumber));
    newBookCard.append(bookTitle, bookAuthor, bookPages, bookLanguage, bookRating, bookReadStatus, removeBook);
    return newBookCard;
  }

  ReadStatusChanger(bookNumber) {
    myLibrary[bookNumber].readStatus = !myLibrary[bookNumber].readStatus;
    this.displayBooks();
  }

  BookRemover(bookNumber) {
    const temp = myLibrary.splice(bookNumber, 1);
    this.displayBooks();
  }

  addBookToLibrary() {
    myLibrary.push(new Book(
      newBookTitle.value,
      newBookAuthor.value,
      newBookPages.value,
      newBookLanguage.value,
      newBookRating.value,
      newBookReadStatus.checked
    ));
    this.displayBooks();
  }

  clearFields() {
    newBookTitle.value = "";
    newBookAuthor.value = "";
    newBookPages.value = "";
    newBookLanguage.value = "";
    newBookRating.value = "";
    newBookReadStatus.checked = false;
  }
}

const myBook = new Book();

modalActivationButton.addEventListener("click", () => {
  dialog.showModal();
});

newBookCloseButton.addEventListener("click", () => {
  dialog.close();
  myBook.clearFields();
});

newBookAdd.addEventListener("click", () => {
  myBook.addBookToLibrary();
  dialog.close();
  event.preventDefault();
  myBook.clearFields();
});

myBook.displayBooks();
