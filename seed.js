var file = require("./sample_json.json");
console.log(file);

const mongoose = require("mongoose");
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

Book.deleteMany({}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("removed all books");
  }
});
Book.insertMany(file)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
