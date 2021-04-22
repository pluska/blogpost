const AuthorModel = require("./AuthorModel");

module.exports = (sequelize, type) => {
  return sequelize.define('post', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: type.STRING,
    body: type.STRING,
    draft: {
      type: type.BOOLEAN,
      defaultValue: true
    },
    publish_date: type.DATE,
    author_firstname: type.STRING,
    author_id: type.INTEGER
  }, {
    timestamps: false 
  })
}
