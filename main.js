const localStorageKey = "BOOKSHELF_DATA";

// Function to add a new book
function addBook(title, author, year, isComplete) {
  const book = { title, author, year, isComplete };

  try {
    let books = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    books.push(book);
    localStorage.setItem(localStorageKey, JSON.stringify(books));
    return true;
  } catch (error) {
    console.error("Error adding book to local storage:", error);
    return false;
  }
}

// Function to render a book
function renderBook(book) {
  const shelfList = document.getElementById(
    book.isComplete ? "completeBookshelfList" : "incompleteBookshelfList"
  );
  const article = document.createElement("article");
  article.classList.add("book_item");
  article.innerHTML = `
    <h3>${book.title}</h3>
    <p>Penulis: ${book.author}</p>
    <p>Tahun: ${book.year}</p>
    <div class="action">
      <button class="green">${
        book.isComplete ? "Selesai dibaca" : "Belum selesai dibaca"
      }</button>
      <button class="red">Hapus buku</button>
    </div>
  `;
  shelfList.appendChild(article);
}

// Event listener for the form submission
document
  .getElementById("inputBook")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    const isComplete = document.getElementById("inputBookIsComplete").checked;

    if (addBook(title, author, year, isComplete)) {
      renderBook({ title, author, year, isComplete });
    }
  });

// Function to render existing books
function renderExistingBooks() {
  const books = JSON.parse(localStorage.getItem(localStorageKey)) || [];

  books.forEach((book) => renderBook(book));
}

// Call the renderExistingBooks function to render existing books when the page loads
renderExistingBooks();
