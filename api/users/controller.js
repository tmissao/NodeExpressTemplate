const { QGetById } = require('./queries');

const _getById = async (req, res, next, database) => {
  const { id } = req.params;
  let conn = null;

  try {
    conn = await database.getConnection(true);
    const result = await database.execute(conn, QGetById, [id]);
    return res.send(JSON.stringify({ success: true, data: result[0] }));
  } catch (err) {
    database.closeConnection(conn);
    return next(err);
  }
};

const getController = (database) => ({
  getById: (req, res, next) => _getById(req, res, next, database)
});


module.exports.getController = getController;

