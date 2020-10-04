module.exports = {
  type: process.env.DB,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: false,
  entities: process.env.NODE_ENV === "dev" ? [ "src/entities/**/*.ts" ] : [ "build/entities/**/*.js" ]
}