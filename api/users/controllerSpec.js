const controller = require('./controller');
const DatabaseMock = require('../../spec/mocks/DatabaseMock');
const ResponseMock = require('../../spec/mocks/ResponseMock');
const ErrorMock = require('../../spec/mocks/ErrorMock');
const { QGetById } = require('./queries');

describe('Testing Users Controller', () => {
  const id = 5;
  let database, result;

  beforeEach(() => {
    result = {
      id: 5, email: 'teste@teste.com', firstname: 'Mauricio', lastname: 'Silva',
      password: '46070d4bf934fb0d4b06d9e2c46e346944e322444900a435d7d9a95e6d7435f5',
      created: '2018-01-23T15:14:44.000Z', modified: '2018-01-23T15:14:44.000Z',
      status: 1
    };

    database = new DatabaseMock().getDatabaseMock();
  });

  it('Simulating a successful getById Query', () => {
    const req = { params: { id } };

    const res = new ResponseMock((output) => {
      expect(result).toEqual(JSON.parse(output).data);
    }).getMock();

    database.pushQueryObject(QGetById, [id], [result]);

    controller.getController(database).getById(req, res, {});
  });

  it('Simulating a database error', (done) => {
    const req = { params: { id } };

    const res = new ResponseMock((output) => {
      expect(result).toEqual(JSON.parse(output).data);
    }).getMock();

    const next = new ErrorMock((err) => {
      expect(err).toEqual(jasmine.any(Error));
      done();
    }).getMock();

    controller.getController(database).getById(req, res, next);
  });
});
