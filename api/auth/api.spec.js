const request = require('request');
const app = require('../../app');
const config = require('../../config/config');
const router = require('./router');

const BASE_URL = config.app.getPath(router.path);

describe('AUTH API', () => {
  let server;

  beforeAll(() => {
    server = app.listen(config.app.port);
  });

  afterAll(() => {
    server.close();
  });

  describe('POST /auth successful', () => {
    const payload = { email: 'test@test.com', password: 'test' };
    const result = {};

    beforeAll((done) => {
      const options = {
        method: 'POST',
        uri: BASE_URL,
        json: payload
      };

      request.post(options, (err, res, body) => {
        if (err) { throw new Error('Request Error'); }
        result.status = res.statusCode;
        result.body = body;
        done();
      });
    });

    it('Status 200', () => {
      expect(result.status).toBe(config.requestCodes.OK);
    });

    it('Body', () => {
      const { success, data } = result.body;
      expect(success).toBe(true);
      expect(data.jwt).toEqual(jasmine.any(String));
    });
  });

  describe('POST /auth missing email', () => {
    const payload = { password: 'test' };
    const result = {};

    beforeAll((done) => {
      const options = {
        method: 'POST',
        uri: BASE_URL,
        json: payload
      };

      request.post(options, (err, res, body) => {
        if (err) { throw new Error('Request Error'); }
        result.status = res.statusCode;
        result.body = body;
        done();
      });
    });

    it('Status 401', () => {
      expect(result.status).toBe(config.requestCodes.BAD_REQUEST);
    });
  });

  describe('POST /auth missing password', () => {
    const payload = { email: 'test@test.com' };
    const result = {};

    beforeAll((done) => {
      const options = {
        method: 'POST',
        uri: BASE_URL,
        json: payload
      };

      request.post(options, (err, res, body) => {
        if (err) { throw new Error('Request Error'); }
        result.status = res.statusCode;
        result.body = body;
        done();
      });
    });

    it('Status 401', () => {
      expect(result.status).toBe(config.requestCodes.BAD_REQUEST);
    });
  });
});
