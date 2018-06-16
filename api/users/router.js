const express = require('express');
const Controller = require('./controller');
const database = require('../../lib/database');

const PATH = '/users';

const router = express.Router();
const controller = Controller.getController(database);

router.get('/:id', controller.getById);

module.exports = { path: PATH, router };
