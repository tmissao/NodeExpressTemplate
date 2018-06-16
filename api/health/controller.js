const _health = (req, res) => {
  return res.send(JSON.stringify({ status: 'OK' }));
};

const getController = () => ({
  health: (req, res, next) => _health(req, res, next)
});


module.exports.getController = getController;
