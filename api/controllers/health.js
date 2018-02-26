const health = (req, res) => {
  return res.send(JSON.stringify({ status: 'OK' }));
};

module.exports.health = health;
