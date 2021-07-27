const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

const loginRouter = require('./routes/loginRouter');
const userRouter = require('./routes/userRouter');
const courseRouter = require('./routes/courseRouter');
const moduleRouter = require('./routes/moduleRouter');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/courses', courseRouter);
app.use('/modules', moduleRouter);

module.exports = app;