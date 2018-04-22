'use strict';

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Photo', {
    userID: DataTypes.STRING,
    photoLink: DataTypes.STRING,
    dateCreate: DataTypes.STRING,
    match: DataTypes.STRING,
    stadium: DataTypes.STRING
  });

  Model.associate = (models) => {
    this.Users = this.belongsToMany(models.User, { through: 'UserPhoto' });
  };

  Model.prototype.toWeb = (pw) => {
    let json = this.toJSON();
    return json;
  }

  return Model;
};
