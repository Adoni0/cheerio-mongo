var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

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

mongoose.connect("mongodb://localhost/unit18Populater", {
  useNewUrlParser: true,
});

app.get("/scrape", function (req, res) {
  axios.get("https://www.theonion.com/").then(function (response) {
    var $ = cheerio.load(response.data);

    //title class = 'sc-1qoge05-0'
    //summary class = 'sc-1d3a351-0'
    //

    $("article").each(function (i, element) {
      var result = {};

      result.title = $(this).children("h4").class("sc-1qoge05-0");
      //$('h4.sc-1qoge05-0')
      result.summary = $(this).children("p").class("sc-1d3a351-0");
      //$('p.sc-1d3a351-0')
      result.link = $(this).children("a").attr("href");
    });
  });
});

app.get("/articles", function (req, res) {});

//grab specific article by id and and populate with comments
app.get("/articles/:id", function (req, res) {});

app.post("/articles/:id", function (req, res) {});

app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
