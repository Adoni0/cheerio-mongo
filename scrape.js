var cheerio = require("cheerio");
var axios = require("axios");
var db = require("./models");

var scrape = function () {
  // app.get("/scrape", function (req, res) {
  return axios.get("https://www.theonion.com/").then(function (response) {
    var $ = cheerio.load(response.data);

    //   console.log(response.data);
    $("div.sc-1pw4fyi-2").each(function (i, element) {
      var result = {};

      var title = $(this).find("h4").text().trim();
      //   console.log(title);
      var link = $(this).find("a").attr("href");
      //   console.log(link);
      var summary = $(this).find("p").text().trim();
      //   console.log(summary);

      // db.Article.create(result)
      // .then(function(dbarticle){
      //     console.log(dbarticle);
      // }).catch(function(error){
      //     console.log(error);
      // })

      // res.send('Scrape Complete');
    });
  });
  //   });
};

scrape();

module.exports = scrape;
