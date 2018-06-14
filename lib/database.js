const mysql = require('mysql');
const config = require('../config/config').database;

const databaseConfig = {
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  connectionLimit: 30,
  debug: false,
  acquireTimeout: 3000
};

const databaseReadConfig = {
  host: config.hostReadOnly,
  user: config.user,
  password: config.password,
  database: config.database,
  connectionLimit: 150,
  acquireTimeout: 3000,
  debug: false
};


const pool = mysql.createPool(databaseConfig);
const readPoll = mysql.createPool(databaseReadConfig);

const execute = (conn, query, params) => {
  return new Promise((resolve, reject) => {
    conn.query(query, params, (error, results) => {
      if (error) {
        return reject(error);
      }

      return resolve(results);
    });
  });
};

/**
 * Gets a connection from connection Pool
 */
const createConnection = (isReadOnly) => {
  return new Promise((resolve, reject) => {
    const source = isReadOnly ? readPoll : pool;

    source.getConnection((err, conn) => {
      if (err) {
        return reject(err);
      }
      return resolve(conn);
    });
  });
};

/**
 * Creates Transaction
 */
const createTransaction = (conn) => {
  return new Promise((resolve, reject) => {
    conn.beginTransaction((err) => {
      if (err) { return reject(err); }
      return resolve();
    });
  });
};

/**
 * Commits Transaction
 */
const commitTransaction = (conn) => {
  return new Promise((resolve, reject) => {
    conn.commit((err) => {
      if (err) { return reject(err); }
      return resolve();
    });
  });
};

/**
 * Rollback Transaction
 */
const rollbackTransaction = (conn) => {
  return new Promise((resolve, reject) => {
    conn.rollback((err) => {
      if (err) { return reject(err); }
      return resolve();
    });
  });
};

const closeConnection = (conn) => {
  if (conn) { conn.release(); }
};

module.exports.execute = execute;
module.exports.getConnection = createConnection;
module.exports.createTransaction = createTransaction;
module.exports.commitTransaction = commitTransaction;
module.exports.rollbackTransaction = rollbackTransaction;
module.exports.closeConnection = closeConnection;
