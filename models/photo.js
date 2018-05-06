'use strict';

module.exports = (sequelize, DataTypes) => {
  var Photo = sequelize.define('Photo', {
    userID    : DataTypes.INTEGER,
    photoLink : DataTypes.STRING,
    stadium   : DataTypes.STRING,
    match     : DataTypes.STRING,
    dateCreate: DataTypes.DATE
  }, {});

  Photo.associate = function(models) {
    this.Users = this.belongsToMany(models.User, { through: 'UserPhoto' });
  };

  Photo.prototype.toWeb = (pw) => {
    let json = this.toJSON();
    return json;
  }

  return Photo;
};
