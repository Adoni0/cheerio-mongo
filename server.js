var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
var viewRoutes = require("./routes/view/viewRoutes.js");
var apiRoutes = require("./routes/api/apiRoutes.js");
var db = require("./models");

var PORT = 3000;

var app = express();

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(viewRoutes);
app.use(apiRoutes);

mongoose.connect("mongodb://localhost/unit18Populater", {
  useNewUrlParser: true,
});



app.get("/articles", function (req, res) {});

//grab specific article by id and and populate with comments
app.get("/articles/:id", function (req, res) {});

app.post("/articles/:id", function (req, res) {});

app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
