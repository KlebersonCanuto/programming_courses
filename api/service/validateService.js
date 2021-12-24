const Course = require('../controller/courseController');
const Module = require('../controller/moduleController');
const Material = require('../controller/materialController');
const Quiz = require('../controller/quizController');
const Problem = require('../controller/problemController');

const courseLocked = async (req) => {
  const url = req.originalUrl;
  const id = req.params.id;
  if(url.includes('courses')) {
    return Course.checkCourseLocked(id);
  } else if (url.includes('modules')) {
    return Module.checkCourseLocked(id);
  } else if (url.includes('materials')) {
    return Material.checkCourseLocked(id);
  } else if (url.includes('quizzes')) {
    return Quiz.checkCourseLocked(id);
  } else if (url.includes('problems')) {
    return Problem.checkCourseLocked(id);
  }
}

const checkCourseLocked = async (req, res, next) => {
  const locked = courseLocked(req);
  if (!locked) {
    res.status(400).send();
    return;
  }

  next();
}

// TODO check with body
const checkCourseUnlocked = async (req, _, next) => {
  const locked = courseLocked(req);
  if (locked) {
    res.status(400).send();
    return;
  }

  next();
}

module.exports = {
  checkCourseLocked,
  checkCourseUnlocked
};