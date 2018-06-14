class DatabaseMock {
  constructor() {
    this._queryObjects = [];
    this._conn = {
      query: jasmine.createSpy().and.callFake((query, params, callback) => {
        for (let i = 0; i < this._queryObjects.length; i++) {
          const queryObject = this._queryObjects[i];
          const queryEquals = queryObject.query === query;

          if (queryEquals) {
            let paramsEquals = queryObject.params.length === params.length;

            for (let k = 0; k < queryObject.params.length && paramsEquals; k++) {
              if (params[k] !== queryObject.params[k]) {
                paramsEquals = false;
                break;
              }
            }

            if (paramsEquals) {
              return callback(null, queryObject.result);
            }
          }
        }
        return callback(new Error());
      })
    };
  }

  getDatabaseMock() {
    return {
      conn: this._conn,
      getConnection: jasmine.createSpy().and.returnValue(Promise.resolve(this._conn)),
      closeConnection: jasmine.createSpy(),
      execute: jasmine.createSpy().and.callFake((connection, query, params) => {
        return new Promise((resolve, reject) => {
          connection.query(query, params, (err, rows) => {
            if (err) { return reject(err); }
            return resolve(rows);
          });
        });
      }),
      pushQueryObject: (query, params, result) => { this._queryObjects.push({ query, params, result }); }
    };
  }
}

module.exports = DatabaseMock;
