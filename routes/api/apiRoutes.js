// var router = require("express").Router();
// var db = require("../../models");

// //grabs all articles from database
// router.get("/articles", async function (req, res) {
//   let allArticles = await db.Article.find();
//   res.json(allArticles);
// });

// //grab specific article by id and and populate with comments
// router.get("/articles/:id", async function (req, res) {
//   let found = await db.Article.find({ _id: req.params.id }).populate('Comments');
//   res.json(found);
// });

// router.post("/articles/:id", function (req, res) {
//   db.Comments.create(req.body)
//   .then(function(dbcomment){
//     return db.Article.findOneAndUpdate({ _id: req.params.id }, { comments: dbcomment._id }, { new: true });
//   })
//   .then(function(dbarticle){
//     res.json(dbArticle);
//   }).catch(function(err) {
//     // If an error occurred, send it to the client
//     res.json(err);
//   });
// });

// router.put("/articles/delete/:id", async function (req, res) {
//   let update = await db.Comments.remove({ _id: req.params.id });
//   res.json(update);
// });

// module.exports = router;
