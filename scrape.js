var cheerio = require("cheerio");
var axios = require("axios");
var db = require("./models");
var app = express();

var scrape = function () {
  app.get("/scrape", function (req, res) {
  return axios.get("https://www.theonion.com/").then(function (response) {
    var $ = cheerio.load(response.data);

    //   console.log(response.data);
    $("div.sc-1pw4fyi-2").each(function (i, element) {
      var result = {};

      result.title = $(this).find("h4").text().trim();
      //   console.log(title);
      result.link = $(this).find("a").attr("href");
      //   console.log(link);
      result.summary = $(this).find("p").text().trim();
      //   console.log(summary);

      console.log(result);

      db.Article.create(result)
      .then(function(dbarticle){
          console.log(dbarticle);
      }).catch(function(error){
          console.log(error);
      })

      res.send('Scrape Complete');
    });
  });
    });
};

scrape();

module.exports = scrape;
