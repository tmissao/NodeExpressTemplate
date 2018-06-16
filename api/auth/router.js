const express = require('express');
const Controller = require('./controller');

const PATH = '/auth';

const router = express.Router();
const controller = Controller.getController();

router.post('/', controller.login);
router.get('/renew', controller.renew);

module.exports = { path: PATH, router };
