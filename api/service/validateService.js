const Course = require('../controller/courseController');
const Module = require('../controller/moduleController');
const Material = require('../controller/materialController');
const Quiz = require('../controller/quizController');
const Problem = require('../controller/problemController');

const courseLocked = async (url, params) => {
  const id = params.id;
  if(url.includes('courses')) {
    return Course.checkCourseLocked(id);
  } else if (url.includes('modules')) {
      return id ? Module.checkCourseLocked(id) : Course.checkCourseLocked(params.CourseId);
  } else if (url.includes('materials')) {
    return id ? Material.checkCourseLocked(id) : Module.checkCourseLocked(params.ModuleId); 
  } else if (url.includes('quizzes')) {
    return id ? Quiz.checkCourseLocked(id) : Module.checkCourseLocked(params.ModuleId); 
  } else if (url.includes('problems')) {
    return id ? Problem.checkCourseLocked(id) : Module.checkCourseLocked(params.ModuleId); 
  }
}

const checkCourseLocked = async (req, res, next) => {
  const locked = await courseLocked(req.originalUrl, req.params);
  if (!locked) {
    res.status(400).send();
    return;
  }

  next();
}

const checkCourseUnlocked = async (req, res, next) => {
  const locked = await courseLocked(req.originalUrl, req.params.id ? req.params : req.body);
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