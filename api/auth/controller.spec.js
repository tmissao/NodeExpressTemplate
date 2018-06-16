const controller = require('./controller');
const ResponseMock = require('../../spec/mocks/ResponseMock');
const ErrorMock = require('../../spec/mocks/ErrorMock');

describe('Testing Auth Controller', () => {
  it('Successful login', (done) => {
    const req = { body: { email: 'test@test.com', password: 'test' } };
    const next = new ErrorMock().getMock();
    const res = new ResponseMock((output) => {
      const { success, data } = JSON.parse(output);
      expect(success).toBe(true);
      expect(data.jwt).toEqual(jasmine.any(String));
      expect(next.calls.any()).toEqual(false);
      done();
    }).getMock();

    controller.getController().login(req, res, next);
  });

  it('Login without email', (done) => {
    const req = { body: { password: 'test' } };
    const res = new ResponseMock().getMock();

    const next = new ErrorMock((err) => {
      expect(err).toEqual(jasmine.any(Error));
      expect(res.send.calls.any()).toEqual(false);
      done();
    }).getMock();
    controller.getController().login(req, res, next);
  });

  it('Login without password', (done) => {
    const req = { body: { email: 'test@test.com' } };
    const res = new ResponseMock().getMock();

    const next = new ErrorMock((err) => {
      expect(err).toEqual(jasmine.any(Error));
      expect(res.send.calls.any()).toEqual(false);
      done();
    }).getMock();
    controller.getController().login(req, res, next);
  });
});
