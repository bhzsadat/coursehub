'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Courses', 'title', {
      type: Sequelize.TEXT,
      allowNull: false
    });
    await queryInterface.changeColumn('Courses', 'description', {
      type: Sequelize.TEXT,
      allowNull: false
    });
    await queryInterface.changeColumn('Courses', 'estimatedTime', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('Courses', 'materialsNeeded', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Courses', 'title', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('Courses', 'description', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('Courses', 'estimatedTime', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('Courses', 'materialsNeeded', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
}; 