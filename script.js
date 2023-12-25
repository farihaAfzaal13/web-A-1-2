document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("bookForm");
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const addEditBtn = document.getElementById("addEditBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const booksList = document.getElementById("books");
  
    let editingBookId = null;
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const title = titleInput.value.trim();
      const author = authorInput.value.trim();
  
      if (title === "" || author === "") {
        alert("Please enter both title and author.");
        return;
      }
  
      if (editingBookId === null) {
        addBook(title, author);
      } else {
        editBook(editingBookId, title, author);
      }
  
      clearForm();
    });
  
    cancelBtn.addEventListener("click", function () {
      clearForm();
    });
  
    function addBook(title, author) {
      const newBook = document.createElement("li");
      newBook.innerHTML = `
        <span>${title} by ${author}</span>
        <button class="editBtn" onclick="editBookHandler(${booksList.childElementCount}, '${title}', '${author}')">Edit</button>
        <button class="deleteBtn" onclick="deleteBook(${booksList.childElementCount})">Delete</button>
      `;
      booksList.appendChild(newBook);
    }
  
    function editBook(id, title, author) {
      const bookItem = booksList.children[id - 1];
      bookItem.innerHTML = `
        <span>${title} by ${author}</span>
        <button class="editBtn" onclick="editBookHandler(${id}, '${title}', '${author}')">Edit</button>
        <button class="deleteBtn" onclick="deleteBook(${id})">Delete</button>
      `;
      editingBookId = null;
    }
  
    function editBookHandler(id, title, author) {
      editingBookId = id;
      titleInput.value = title;
      authorInput.value = author;
      addEditBtn.textContent = "Edit Book";
    }
  
    function deleteBook(id) {
      if (confirm("Are you sure you want to delete this book?")) {
        booksList.removeChild(booksList.children[id - 1]);
        clearForm();
      }
    }
  
    function clearForm() {
      titleInput.value = "";
      authorInput.value = "";
      addEditBtn.textContent = "Add Book";
      editingBookId = null;
    }
  });
  