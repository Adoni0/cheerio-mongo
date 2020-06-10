var router = require("express").Router();
var db = require("./models");

//grabs all articles from database
router.get("/articles", async function (req, res) {
  let allArticles = await db.Article.find();
  res.json(allArticles);
});

//grab specific article by id and and populate with comments
router.get("/articles/:id", async function (req, res) {
  let found = await db.Article.find({ _id: req.params.id }).populate('Comments');
  res.json(found);
});

router.post("/articles/:id", function (req, res) {});

module.exports = router;
