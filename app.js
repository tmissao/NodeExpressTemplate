const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const health = require('./api/routes/health');
const authorize = require('./lib/authorize');
const output = require('./lib/output');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use((req, res, next) => { res.type('json'); next(); });
app.use('/health', health);

// Authentication required URLs below
app.use(authorize);

app.use(output);

module.exports = app;
