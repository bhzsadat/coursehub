'use strict';

const bcryptjs = require("bcryptjs");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Courses, {
        foreignKey: {
          name: 'userId',
          allowNull: false
        }
      });
    }
  }
  Users.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First name is required"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Last name is required"
        }
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Must be a valid email address"
        },
        notEmpty: {
          msg: "Email address is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notNull: {
              msg: "A password is required",
          },
          notEmpty: {
              msg: "Please provide a password",
          },
      },
      set(val) {
          if (val) {
              const hashedPassword = bcryptjs.hashSync(val, 10);
              this.setDataValue("password", hashedPassword);
          }
      },
    },
  }, {
    sequelize,
    modelName: 'Users',
    timestamps: true
  });
  return Users;
};