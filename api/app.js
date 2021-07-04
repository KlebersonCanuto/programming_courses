const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const loginRouter = require('./routes/loginRouter');
const userRouter = require('./routes/userRouter');

const jsonParser = bodyParser.json();
dotenv.config();
const app = express();

app.use(cors());
app.use(jsonParser);
app.use(morgan('dev'));

app.use('/user', userRouter);
app.use('/login', loginRouter);

module.exports = app;