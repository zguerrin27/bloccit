const topicQueries = require("../db/queries.topics.js");

module.exports = {

  index(req, res, next){
    console.log(req.body)
    console.log("index")
    topicQueries.getAllTopics((err, topics) => {
      if(err){
        console.log(err);
        res.redirect(500, "static/index");
      } else {
        res.render("topics/index", {topics});
      }
    })
  },

  new(req, res, next){
    console.log(req.body)
    console.log("new")
    res.render("topics/new");
  },

  create(req, res, next){
    console.log("before new topic")
    console.log(req.body)

    let newTopic = {
      title: req.body.title,
      description: req.body.description
    };

    console.log("after new topic")
    console.log(newTopic)

    topicQueries.addTopic(newTopic, (err, topic) => {
      if(err){
        res.redirect(500, "/topics/new");
      } else {
        res.redirect(303, `/topics/${topic.id}`);
      }
    });
  },
}
