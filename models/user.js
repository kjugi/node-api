'use strict';

const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    nick   : DataTypes.STRING,
    stadium: DataTypes.STRING,
    tribune: DataTypes.STRING,
    sector : DataTypes.STRING,
    row    : DataTypes.STRING,
    place  : DataTypes.STRING,
    match  : DataTypes.STRING
  }, {});

  User.associate = function(models) {
    this.Photos = this.belongsToMany(models.Photo, { through: 'UserPhoto' });
  };

  User.prototype.getJWT = () => {
    let expirationTime = parseInt(CONFIG.jwt_expiration);

    return `Bearer ${jwt.sign({ user_id: this.id }, CONFIG.jwt_encryption, { expiresIn: expirationTime })}`;
  };

  User.prototype.toWeb = (pw) => {
    let json = this.toJSON();
    return json;
  }
  return User;
};
