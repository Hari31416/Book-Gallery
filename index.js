const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
// const methodOverride = require("method-override");

const Book = require("./models/book");

mongoose
  .connect(
    "mongodb+srv://hari31416:Hari%40MongoDB@cluster0.k0zxu.mongodb.net/bookGallery",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "statics")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// THE HOME ROUTE
app.get("/", async (req, res) => {
  const title = "Welcome to the Homepage";
  const books_all = await Book.find();
  var randNums = [];
  for (let index = 0; index < 30; index++) {
    var randNum = Math.floor(Math.random() * books_all.length);
    randNums.push(randNum);
  }
  var books = [];
  var j = 0;
  for (let index = 0; index < 30; index++) {
    foundBook = books_all[randNums[index]];
    var bookHighImageUrls = foundBook.imgUrlsHigh;
    if (bookHighImageUrls.length > 0) {
      books.push(foundBook);
      j++;
    }
    if (j >= 10) {
      break;
    }
  }
  res.render("home", { title: title, books: books });
});

// THE BOOKS ROUTE
app.get("/books", async (req, res) => {
  const title = "All Books";
  const { author, genre, series } = req.query;
  var query;
  if (author === undefined && genre === undefined && series === undefined) {
    query = {};
  }
  if (author !== undefined && genre === undefined) {
    query = { author: author };
  }
  if (author === undefined && genre !== undefined) {
    query = { genre: genre };
  }
  if (author !== undefined && genre !== undefined) {
    query = { author: author, genre: genre };
  }
  if (series !== undefined) {
    query = { series: series };
  }

  var books = await Book.find(query);
  var allBooks;
  const numBooks = 450;
  foundBooksLength = books.length;
  if (foundBooksLength === numBooks) {
    allBooks = true;
  } else {
    allBooks = false;
  }
  res.render("allbooks", { title: title, books: books, allBooks: allBooks });
});

// THE BOOK DETAIL ROUTE
app.get("/books/:id", async (req, res) => {
  const foundBook = await Book.findById(req.params.id);
  title = foundBook.name;
  res.render("book", { title: title, book: foundBook });
});
app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
