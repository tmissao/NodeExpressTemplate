const QGetById = `
  SELECT * FROM sp_users
  WHERE id = ?
`;

module.exports.QGetById = QGetById;
