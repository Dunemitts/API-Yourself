const showBookDetails = (index) => {
    const book = myLibrary[index];
    const bookCard = document.getElementById(`book-${index}`);
    const bookTitle = bookCard.querySelector('.book-title');
    const bookAuthor = bookCard.querySelector('.book-author');
    const bookPages = bookCard.querySelector('.book-pages');
    const bookRead = bookCard.querySelector('.book-read');
    const bookRating = bookCard.querySelector('.book-rating');
  
    bookTitle.textContent = `Title: ${book.title}`;
    bookAuthor.textContent = `Author: ${book.author}`;
    bookPages.textContent = `Pages: ${book.pages}`;
    bookRead.textContent = `Read: ${book.read}`;
    bookRating.textContent = `Rating: ${book.rating}`;
  
    bookCard.classList.toggle('flipped');
  };
   
const getBooks = () => {
  let query = $("#bookQuery").val();
  $.getJSON(`https://openlibrary.org/search.json?title=${query}`, successfullyExecutedAPI);
};

const process = (books) => {
  let allBooks = ""; 
  books.docs.forEach(function (book) {
    let nextBook = `<div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">
    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="BOOK COVER NOT BE FOUND" style="width: 300px; height: 450px;"></div>
    <div class="flip-card-back"><div class="title" style="position: relative; text-align: center;font-size: x-large; top: 20px">${book.title}</div>
    <div class="autorName" style="position: relative; text-align: center;font-size: x-large; top: 30px">Author: ${book.author_name}</div>
    <div class="link" style="position: absolute; text-align: center; top: 410px; color: white"><a href="https://openlibrary.org/${book.key}" style="color:white;">Link to ${book.title}</a></div>
    </div>
  </div>
</div>`;
    allBooks += nextBook;
  });
  return allBooks;
};

const successfullyExecutedAPI = (data) => {
  console.log("successAPI ", data);
  let markup = process(data);
  $("#bookList").html(markup);
};



const searchBooks = () => {
  getBooks();
};

const setupPage = () => {
  $("#searchButton").click(searchBooks);
};

$(document).ready(setupPage);