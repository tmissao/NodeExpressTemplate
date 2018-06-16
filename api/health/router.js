const express = require('express');
const controller = require('./controller');

const PATH = '/health';

const router = express.Router();

router.get('/', controller.getController().health);

module.exports = { path: PATH, router };
