const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: [String],
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  numPages: {
    type: String,
    min: 1,
    max: 10000,
  },
  description: {
    type: String,
  },
  yearPublished: {
    type: String,
    min: 1,
    max: new Date().getFullYear(),
  },
  series: {
    type: String,
  },
  ISBN: {
    type: String,
  },
  avgRating: {
    type: Number,
    min: 0,
    max: 5,
  },
  publisher: {
    type: String,
  },
  imgUrlsLow: {
    type: [String],
  },
  imgUrlsHigh: {
    type: [String],
  },
});

const Book = mongoose.model("Book", bookSchema);
bookSchema.virtual("authors").get(function () {
  return this.author.join(", ");
});

module.exports = Book;
