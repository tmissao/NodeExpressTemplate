const request = require('request');
const app = require('../../app');
const config = require('../../config/config');
const router = require('./router');

const BASE_URL = config.app.getPath(router.path);

describe('Health API', () => {
  let server;

  beforeAll(() => {
    server = app.listen(config.app.port);
  });

  afterAll(() => {
    server.close();
  });

  describe('GET /health', () => {
    const data = {};

    beforeAll((done) => {
      const options = {
        method: 'GET',
        uri: BASE_URL,
        json: true
      };

      request.get(options, (err, res, body) => {
        if (err) { throw new Error('Request Error'); }
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });

    it('Status 200', () => {
      expect(data.status).toBe(config.requestCodes.OK);
    });

    it('Body', () => {
      const { status } = data.body;
      expect(status).toBe('OK');
    });
  });
});
