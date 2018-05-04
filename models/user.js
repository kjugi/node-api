'use strict';

const bcrypt  = require('bcrypt'),
      bcryptp = require('bcrypt-promise'),
      jwt     = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('User', {
    id     : { type: DataTypes.STRING, unique: true },
    nick   : DataTypes.STRING,
    stadium: DataTypes.STRING,
    tribune: DataTypes.STRING,
    sector : DataTypes.STRING,
    row    : DataTypes.STRING,
    place  : DataTypes.STRING,
    match  : DataTypes.STRING,
    time   : DataTypes.DATE
  });

  Model.associate = (models) => {
    this.Photos = this.belongsToMany(models.Photo, { through: 'UserPhoto' });
  };

  Model.prototype.getJWT = () => {
    let expirationTime = parseInt(CONFIG.jwt_expiration);

    return `Bearer ${jwt.sign({ user_id: this.id}, CONFIG.jwt_encryption, { expiresIn: expirationTime })}`;
  };

  Model.prototype.toWeb = (pw) => {
    let json = this.toJSON();
    return json;
  }

  return Model;
};
