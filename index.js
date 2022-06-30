const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
// const methodOverride = require("method-override");

const Book = require("./models/book");

mongoose
  .connect("mongodb://localhost:27017/bookGallery", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
  const books = await Book.find();
  res.render("home", { title: title, books: books });
});

// THE BOOKS ROUTE
app.get("/books", async (req, res) => {
  const title = "All Books";
  const { author, genre } = req.query;
  if (author === undefined && genre === undefined) {
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
  var books = await Book.find(query);
  res.render("allbooks", { title: title, books: books });
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
