'use strict';
module.exports = (sequelize, DataTypes) => {
  var Topic = sequelize.define('Topic', {
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
  }
  }, {});
  Topic.associate = function(models) {
    // associations can be defined here
    Topic.hasMany(models.Banner, {
      foreignKey: "topicId",
      as: "banners",
    });
    Topic.hasMany(models.Rule, {
      foreignKey: "topicId",
      as: "rule",
    });
  };
  return Topic;
};