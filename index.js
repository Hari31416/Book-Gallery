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
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "statics")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  title = "Welcome to the Homepage";
  const books = await Book.find();
  res.render("home", { title: title, books: books });
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
