module.exports = (err, req, res, next) => {
  const okCode = 200;
  res.type('json');

  if (err.status !== okCode) {
    const defaultErrorCode = 500;
    res.status(err.status || defaultErrorCode);
    res.send(JSON.stringify({ statusCode: err.status, message: err.message, trace: err.stack }));
  }

  next();
};
