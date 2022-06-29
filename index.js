const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "statics")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  title = "Welcome to the Homepage";
  res.render("home", { title: title });
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
