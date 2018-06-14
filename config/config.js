
const config = {
  app: {
    port: process.env.PORT
  },
  database: {
    host: process.env.MYSQL_HOST,
    hostReadOnly: process.env.MYSQL_HOST_READ_ONLY,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
  }
}

module.exports = config;
