const Course = require('../controller/courseController');
const Module = require('../controller/moduleController');
const Material = require('../controller/materialController');
const Quiz = require('../controller/quizController');
const Problem = require('../controller/problemController');
const Logger = require('../utils/logger');

const logger = new Logger('validateService');

const courseLocked = async (url, params) => {
  try{
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
  } catch(err) {
    throw err;
  }
}

const checkCourseLocked = async (req, res, next) => {
  try{
    const locked = await courseLocked(req.originalUrl, req.params);
    logger.debug('checkCourseLocked', `course locked: ${locked}`);
    if (!locked) {
      res.status(400).send();
      return;
    }
  
    next();
  } catch(err) {
    logger.error('checkCourseLocked', err);
    res.status(400).send();
  }
}

const checkCourseUnlocked = async (req, res, next) => {
  try{
    const locked = await courseLocked(req.originalUrl, req.params.id ? req.params : req.body);
    logger.debug('checkCourseLocked', `course locked: ${locked}`);
    if (locked) {
      res.status(400).send();
      return;
    }
    next();
  } catch(err) {
    logger.error('checkCourseUnlocked', err);
    res.status(400).send();
  }
}

module.exports = {
  checkCourseLocked,
  checkCourseUnlocked
};