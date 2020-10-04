module.exports = {
  "type": process.env.DB,
  "host": process.env.HOST,
  "port": process.env.DB_PORT,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DATABASE,
  "synchronize": true,
  "logging": false,
  "entities": [
    "src/entities/**/*.ts"
  ]
}