'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nick: {
        type: Sequelize.STRING
      },
      stadium: {
        type: Sequelize.STRING
      },
      tribune: {
        type: Sequelize.STRING
      },
      sector: {
        type: Sequelize.STRING
      },
      row: {
        type: Sequelize.STRING
      },
      place: {
        type: Sequelize.STRING
      },
      match: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};