const jwtHandler = require('../../lib/jwt');
const requestCodes = require('../../config/config').requestCodes;
const authorize = require('../../lib/authorize');

const _login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error('Unable to find email/password in request');
    error.status = requestCodes.BAD_REQUEST;
    return next(error);
  }

  // Validates your login logic here...

  // Building a Demo User
  const user = {
    id: Math.floor(Math.random() * 1000),
    email
  };

  const token = jwtHandler.encode(user, 'id');
  const data = { type: 'session', jwt: token };

  return res.send(JSON.stringify({ success: true, data }));
};

const _renew = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    const err = new Error('Not Authorized');
    err.status = requestCodes.NOT_AUTHORIZED;
    return next(err);
  }

  const token = authorization.replace('Bearer ', '');

  return jwtHandler.decode(token)
    .then((value) => {
      const userInfo = authorize.extractUserInfo(value);
      const encoded = jwtHandler.encode(userInfo, 'id');
      const data = { type: 'session', jwt: encoded };
      res.send(JSON.stringify({ success: true, data }));
    })
    .catch((err) => {
      next(err);
    });
};

const getController = () => ({
  login: (req, res, next) => _login(req, res, next),
  renew: (req, res, next) => _renew(req, res, next)
});


module.exports.getController = getController;
