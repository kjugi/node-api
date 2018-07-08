/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Photos', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    photoLink: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    stadium: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tribune: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sector: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    row: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    place: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    match: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'Photos'
  });
};
