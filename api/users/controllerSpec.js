const controller = require('./controller');
const { QGetById } = require('./queries');

describe('Testing Users Controller', () => {
  const id = 5;
  let database, conn, res, result;

  beforeEach(() => {
    result = {
      id: 5, email: 'teste@teste.com', firstname: 'Mauricio', lastname: 'Silva',
      password: '46070d4bf934fb0d4b06d9e2c46e346944e322444900a435d7d9a95e6d7435f5',
      created: '2018-01-23T15:14:44.000Z', modified: '2018-01-23T15:14:44.000Z',
      status: 1
    };

    conn = {
      query: jasmine.createSpy().and.callFake((query, params, callback) => {
        if (query === QGetById && params[0] === id) {
          return callback(null, [result]);
        }
        return callback(new Error());
      })
    };

    database = {
      getConnection: jasmine.createSpy().and.returnValue(Promise.resolve(conn)),
      closeConnection: jasmine.createSpy(),
      execute: jasmine.createSpy().and.callFake((connection, query, params) => {
        return new Promise((resolve, reject) => {
          connection.query(query, params, (err, rows) => {
            if (err) { return reject(err); }
            return resolve(rows);
          });
        });
      })
    };

    res = {
      send: jasmine.createSpy().and.callFake((output) => {
        expect(result).toEqual(JSON.parse(output).data);
        expect(database.getConnection.calls.argsFor(0)).toEqual([true]);
        expect(conn.query).toHaveBeenCalledWith(QGetById, [id], jasmine.any(Function));
      })
    };
  });

  it('Simulating a successful getById Query', () => {
    const req = { params: { id } };
    controller.getController(database).getById(req, res, {});
  });
});
