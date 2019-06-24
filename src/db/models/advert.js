'use strict';
module.exports = (sequelize, DataTypes) => {
  var Advert = sequelize.define('Advert', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Advert.associate = function(models) {
    // associations can be defined here
  };
  return Advert;
};