'use strict';

// Courses model
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Courses.belongsTo(models.Users, {
        foreignKey: {
          name: 'userId',
          allowNull: false
        }
      })
    }
  }
  Courses.init({
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title is required"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description is required"
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },    
    estimatedTime: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    materialsNeeded: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Courses',
    timestamps: true
  });
  return Courses;
};