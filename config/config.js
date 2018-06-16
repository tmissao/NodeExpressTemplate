
const config = {
  app: {
    baseUrl: process.env.BASE_URL || 'http://localhost',
    port: process.env.PORT || 3000,
    getPath: (path) => `${config.app.baseUrl}:${config.app.port}${path}`
  },
  database: {
    host: process.env.MYSQL_HOST,
    hostReadOnly: process.env.MYSQL_HOST_READ_ONLY,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
  },
  requestCodes: {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    NOT_FOUND: 404
  }
};

module.exports = config;
