const express = require('express');
const controller = require('../controllers/health');

const router = express.Router();

router.get('/', controller.health);

module.exports = router;
