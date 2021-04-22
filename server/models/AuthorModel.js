'use strict';

module.exports = (sequelize, type) => {
  return sequelize.define('author', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: type.STRING,
    lastname: type.STRING,
    email: type.STRING,
    birthdate: type.DATEONLY,
    password: type.STRING
  }, {
    timestamps: false 
  })
}
