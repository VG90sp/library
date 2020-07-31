const books = [];

$(document).ready(function(){
    $("#modal-add-book-ok").on("click", addBookToLibrary);
});

function addBookToLibrary() {
    const formData = $("form").serializeArray();
    const newArray = [];
    for (key in formData) {
        newArray[formData[key]["name"]] = formData[key]["value"];
    }
    const data = $(this).attr("data");
    if (data === undefined) {
        const randomArticle = Math.round(Math.random()*100000);
        books[randomArticle] = newArray;
        drawBook(randomArticle);
    } else {
       books[data] = newArray;
       drawBook(data)
    }

    $("#modal-add-book").modal("hide"); 
}

function drawBook(article) {
    const book = $('.book[data='+article+']');
    if (book.length === 0) {
        const div = document.createElement("div");
        div.className = "book";
        div.setAttribute("data", article);

        const cover = document.createElement("div");
        cover.className = "book-cover";
        cover.style.backgroundImage = `url(${books[article]["book-pic"]})`;

        const bookName = document.createElement("h4");
        bookName.className = "book-title";
        bookName.innerHTML = books[article]["book-name"];

        const bookYear = document.createElement("p");
        bookYear.className = "book-year";
        bookYear.innerHTML = books[article]["book-year"];

        const bookAuthor = document.createElement("p");
        bookAuthor.className = "book-author";
        bookAuthor.innerHTML = books[article]["book-author"];

        const buttonEdit = document.createElement("button");
        buttonEdit.className = "btn btn-succes edit"; 
        buttonEdit.innerHTML = "Редактировать";
        buttonEdit.setAttribute("data", article);
        buttonEdit.onclick = editBook;

        const buttonDelete = document.createElement("button");
        buttonDelete.className = "btn btn-warning edit"; 
        buttonDelete.innerHTML = "Удалить";
        buttonDelete.onclick = deleteBook;

        div.appendChild(cover);
        div.appendChild(bookName);
        div.appendChild(bookYear);
        div.appendChild(bookAuthor);
        div.appendChild(buttonDelete);
        div.appendChild(buttonEdit);
        
        $(".book-panel").append(div);
    } else {
        const bookCover = book.find(".book-pic");
        bookCover.css({'background-image': 'url('+books[article]['book-pic']+')'})
        const bookYear = book.find('.book-year').eq(0);
        bookYear.html( books[article]["book-year"]);
        const bookName = book.find('.book-title').eq(0);
        bookName.html( books[article]["book-name"] );
        const bookAuthor = book.find('.book-author').eq(0);
        bookAuthor.html( books[article]["book-author"]);
        $('#modal-add-book-ok').removeAttr('data');
    }
}

function editBook() {
    const data = $(this).attr("data");
    //show modal
    $("#modal-add-book").modal("show");
    $("form #book-name").val(books[data]["book-name"]);
    $("form #book-author").val(books[data]["book-author"]);
    $("form #book-pic").val(books[data]["book-pic"]);
    $("form #book-year").val(books[data]["book-year"]);
    $("#modal-add-book-ok").attr("data", data);
}

function deleteBook() {
    const book = $(this).parent('.book');
    const bookId = book.attr('data');
    
    delete books[bookId];

    $(this).parent('.book').remove();
}