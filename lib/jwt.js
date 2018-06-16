'use strict';

const fs = require('fs');
const jwt = require('jsonwebtoken');

const wCert = fs.readFileSync('server.key');
const rCert = fs.readFileSync('public.key');
const jwtAlgorithm = 'RS256';

/**
 * Generates a signed JWT
 */
exports.encode = (obj, subject, expiration) => {
  const expiresIn = expiration || '1h';
  try {
    return jwt.sign(obj, wCert, { expiresIn, algorithm: jwtAlgorithm, subject });
  } catch (error) {
    throw Error(`Unable to sign jwt: ${error.message}`);
  }
};

/**
 * Reads a JWT
 */
exports.decode = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, rCert, { algorithms: [jwtAlgorithm] }, (error, decoded) => {
      if (error != null) {
        reject(error);
      }
      resolve(decoded);
    });
  });
};
