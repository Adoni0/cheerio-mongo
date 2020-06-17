var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var nodemon = require('nodemon');

var axios = require("axios");
var cheerio = require("cheerio");
// var exphbs = require("express-handlebars");
// var webScrape = require("./scrape.js");
// var viewRoutes = require("./routes/view/viewRoutes.js");
// var apiRoutes = require("./routes/api/apiRoutes.js");
var db = require("./models");

var PORT = 3000;

var app = express();

// Handlebars
// app.engine(
//   "handlebars",
//   exphbs({
//     defaultLayout: "main",
//   })
// );
// app.set("view engine", "handlebars");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// app.use(viewRoutes);
// app.use(webScrape);
// app.use(apiRoutes);

mongoose.connect("mongodb://localhost/onion", {
  useNewUrlParser: true,
});


app.get("/scrape", function (req, res) {
  axios.get("https://www.theonion.com/").then(function (response) {
    var $ = cheerio.load(response.data);

    //   console.log(response.data);
    $("div.huquYN").each(function (i, element) {
      var result = {};

      result.title = $(this).find("h4").text().trim();
      //   console.log(title);
      result.link = $(this).children("a").attr("href");
      //   console.log(link);
      result.summary = $(this).find("p").text().trim();
      //   console.log(summary);

      console.log(result);
  

      db.Article.create(result)
        .then(function (dbarticle) {
          console.log(dbarticle);
        }).catch(function (error) {
          console.log(error);
        })

      res.send('Scrape Complete');
    });
  });
});




//grabs all articles from database
app.get("/articles", function (req, res) {
  db.Article.find({})
    .then(function (dbarticle) {
      res.json(dbarticle)
      // var result = JSON.stringify(dbarticle);
      // res.render('index', { article: JSON.parse(result) });
    })
    .catch(function (err) {
      res.json(err);
    });
});

//grab specific article by id and and populate with comments
app.get("/articles/:id", function (req, res) {
  db.Article.findOne({ _id: req.params.id }).populate('Comments')
    .then(function (data) {
      res.json(data);
      // var result = JSON.stringify(dbarticle);
      // res.render('index', { comment: JSON.parse(result) });
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.post("/articles/:id", function (req, res) {
  db.Comments.create(req.body)
    .then(function (dbcomment) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { comments: dbcomment._id }, { new: true });
    })
    .then(function (dbarticle) {
      res.json(dbarticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.delete("/articles/delete/:id", async function (req, res) {
  let update = await db.Comments.remove({ _id: req.params.id });
  res.json(alert(update + 'was deleted'));
});



app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
