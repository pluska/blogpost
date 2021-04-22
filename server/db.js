const Sequelize = require('sequelize')
const PostModel = require('./models/PostModel')
const AuthorModel = require('./models/AuthorModel')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  }
)

const Post = PostModel(sequelize, Sequelize)
const Author = AuthorModel(sequelize, Sequelize)
const Models = { Post, Author }
const connection = {}

module.exports = async () => {
  if (connection.isConnected) {
    console.log('=> Using existing connection.')
    return Models
  }

  await sequelize.sync()
  await sequelize.authenticate()
  connection.isConnected = true
  console.log('=> Created a new connection.')
  return Models
}