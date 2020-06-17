// var cheerio = require("cheerio");
// var axios = require("axios");
// var db = require("./models");
// var express = require('express');
// var app = express();

// var scrape = function () {
// //   app.get("/scrape", function (req, res) {
//   axios.get("https://www.theonion.com/").then(function (response) {
//     var $ = cheerio.load(response.data);

//     //   console.log(response.data);
//     $("div.huquYN").each(function (i, element) {
//       var result = {};

//       result.title = $(this).find("h4").text().trim();
//       //   console.log(title);
//       result.link = $(this).children("a").attr("href");
//       //   console.log(link);
//       result.summary = $(this).find("p").text().trim();
//       //   console.log(summary);

//       console.log(result);

//       db.Article.create(result)
//       .then(function(dbarticle){
//           console.log('dbArticle: ' + dbarticle);
//       }).catch(function(error){
//           console.log(error);
//       })

//     //   res.send('Scrape Complete');
//     });
//   });
//     // });
// };

// scrape();

// module.exports = scrape;
