const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

const loginRouter = require('./routes/loginRouter');
const userRouter = require('./routes/userRouter');
const courseRouter = require('./routes/courseRouter');
const moduleRouter = require('./routes/moduleRouter');
const materialRouter = require('./routes/materialRouter');
const quizRouter = require('./routes/quizRouter');
const problemRouter = require('./routes/problemRouter');
const testRouter = require('./routes/testRouter');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/courses', courseRouter);
app.use('/modules', moduleRouter);
app.use('/materials', materialRouter);
app.use('/quizzes', quizRouter);
app.use('/problems', problemRouter);
app.use('/tests', testRouter);

module.exports = app;