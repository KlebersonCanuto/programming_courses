const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const router = require('./routes');

dotenv.config();
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use('/', router);

module.exports = app;