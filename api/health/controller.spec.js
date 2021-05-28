const controller = require('./controller');
const ResponseMock = require('../../spec/mocks/ResponseMock');
const ErrorMock = require('../../spec/mocks/ErrorMock');

describe('Testing Health Controller', () => {
  it('Successful Health', () => {
    const result = { status: 'OK2' };
    const req = {};
    const next = new ErrorMock().getMock();
    const res = new ResponseMock((output) => {
      expect(result).toEqual(JSON.parse(output));
      expect(next.calls.any()).toEqual(false);
    }).getMock();

    controller.getController().health(req, res, next);
  });
});
