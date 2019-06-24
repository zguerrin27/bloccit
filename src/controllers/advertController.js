const advertQueries = require("../db/queries.adverts.js");

module.exports = {

  // index(req, res, next){
  //   res.render("adverts/index", {title: "Adverts"});
  // }

  index(req, res, next){
    advertQueries.getAllAdverts((err, adverts) => {
      if(err){
        console.log(err);
        res.redirect(500, "static/index");
      } else {
        res.render("adverts/index", {adverts});
      }
    })
  },
  new(req, res, next){
    res.render("adverts/new");
  },
  create(req, res, next){
    let newAdvert = {
      title: req.body.title,
      description: req.body.description
    };
    advertQueries.addAdvert(newAdvert, (err, advert) => {
      if(err){
        res.redirect(500, "/adverts/new");
      } else {
        res.redirect(303, `/adverts/${advert.id}`);
      }
    });
  },
  show(req, res, next){
    advertQueries.getAdvert(req.params.id, (err, advert) => {
      if(err || advert == null){
        res.redirect(404, "/");
      } else {
        res.render("adverts/show", {advert});
      }
    });
  },
  destroy(req, res, next){
    advertQueries.deleteAdvert(req.params.id, (err, advert) => {
      if(err){
        res.redirect(500, `/adverts/${advert.id}`)
      } else {
        res.redirect(303, "/adverts")
      }
    });
  },
  edit(req, res, next){
    advertQueries.getAdvert(req.params.id, (err, advert) => {
      if(err || advert == null){
        res.redirect(404, "/");
      } else {
        res.render("adverts/edit", {advert});
      }
    });
  },
  update(req, res, next){
    advertQueries.updateAdvert(req.params.id, req.body, (err, advert) => {
      if(err || advert == null){
        res.redirect(404, `/adverts/${req.params.id}/edit`);
      } else {
        res.redirect(`/adverts/${advert.id}`);
      }
    });
  }

}

