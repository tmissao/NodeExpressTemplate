const jwtHandle = require('./jwt');

const extractUserInfo = (value) => {
  return {
    id: value.id,
    firstname: value.firstname,
    lastname: value.lastname,
    email: value.email
  };
};

module.exports = (req, res, next) => {
  if (req.originalUrl.indexOf('login') !== -1 || req.originalUrl.indexOf('renew') !== -1) {
    next();
  } else {
    if (!req.headers.authorization) {
      const err = new Error('Token not found');
      err.status = 404;
      next(err);
    }

    const token = req.headers.authorization.replace('Bearer ', '');

    jwtHandle.decode(token).then((value) => {
      req.headers.userInfo = extractUserInfo(value);
      next();
    }).catch((err) => {
      err.status = 401;
      next(err);
    });
  }
};
