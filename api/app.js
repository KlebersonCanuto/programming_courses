const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

const loginRouter = require('./routes/loginRouter');
const userRouter = require('./routes/userRouter');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/user', userRouter);
app.use('/login', loginRouter);

module.exports = app;