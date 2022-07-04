const fs = require("fs");
// fs.readFile("./FINAL.json", function (err, data) {
//   if (data) {
//     console.log("Read JSON file: " + data);
//     data = data.trim();
//     //or data = JSON.parse(JSON.stringify(data.trim()));
//     var file = JSON.parse(data);
//   }
// });
var file = JSON.parse(fs.readFileSync("./FINAL_INFO_WITH_EVERYTHING.json"));
// console.log(file);

const mongoose = require("mongoose");
const Book = require("./models/book");
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.k0zxu.mongodb.net/bookGallery`
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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
// console.log(file[0].genre);
// var rawGenre = file[0].genre;
// genres = rawGenre.slice(1, rawGenre.length - 1).split(", ");
// console.log(genres);
// console.log(typeof genres);
// console.log(typeof file);

// MAKING GENRE A LIST AND CLEANING IT
file.forEach((f) => {
  var rawGenre = f.genre;
  var genres = rawGenre.slice(1, rawGenre.length - 1).split(", ");
  for (let i = 0; i < genres.length; i++) {
    var element = genres[i];
    element = element.slice(1, element.length - 1);
    genres[i] = element;
  }
  f.genre = genres;
});

// REMOVING DUPLICATES
file.forEach((f) => {
  var rawGenre = f.genre;
  var genreFinal = [];
  for (let i = 0; i < rawGenre.length; i++) {
    var element = rawGenre[i];
    if (!genreFinal.includes(element)) {
      genreFinal.push(element);
    }
  }
  f.genre = genreFinal;
});

Book.insertMany(file)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
