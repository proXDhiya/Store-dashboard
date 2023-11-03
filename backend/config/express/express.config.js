// Init express app
const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const app = express();

// Configure express app
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());
app.use(logger('dev'));
app.use(cors());

// Set express app port
app.set('port', process.env.PORT || 3000);

module.exports = app;
