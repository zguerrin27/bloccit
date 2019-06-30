const Flair = require("./models").Flair;

module.exports = {

  getAllFlairs(callback){
    return Flair.findAll()
    .then((flairs) => {
      callback(null, flairs);
    })
    .catch((err) => {
      callback(err);
    })
  },
  addFlair(newFlair, callback){
    return Flair.create({
      name: newFlair.name,
      color: newFlair.color
    })
    .then((flair) => {
      callback(null, flair);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getFlair(id, callback){
    return Flair.findByPk(id)
    .then((flair) => {
      callback(null, flair);
    })
    .catch((err) => {
      callback(err);
    })
  },
  deleteFlair(id, callback){
    return Flair.destroy({
      where: {id}
    })
    .then((flair) => {
      callback(null, flair);
    })
    .catch((err) => {
      callback(err);
    })
  },
  updateFlair(id, updatedFlair, callback){
    return Flair.findByPk(id)
    .then((flair) => {
      if(!flair){
        return callback("Flair not found");
      }
      flair.update(updatedFlair, {
        fields: Object.keys(updatedFlair)
      })
      .then(() => {
        callback(null, flair);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }


}