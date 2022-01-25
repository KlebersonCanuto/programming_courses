const Course = require('../controller/courseController');
const ProgressService = require('./progressService');
const Logger = require('../utils/logger');
const Errors = require('../utils/errors');

const logger = new Logger('CourseService');

const getAll = async (req, res) => {
  try{
    const userId = req.params.userId;
    let courses;
    if (userId) {
      logger.debug('getAll', `userId: ${userId}`);
      courses = await Course.getAllUser(userId);
    } else {
      logger.info('getAll', `getting courses without userId`);
      courses = await Course.getAllLocked(userId);
    }
    res.status(200).send({data: courses});
  } catch(err){
    logger.error('getAll', err);
    res.status(400).send({message: err.message});
  }
}

const getAllAdmin = async (_, res) => {
  try{
    logger.info('getAll', `getting all courses to admin`);
    const courses = await Course.getAll();
    res.status(200).send({data: courses});
  } catch(err){
    logger.error('getAllAdmin', err);
    res.status(400).send({message: err.message});
  }
}

const generateResponseGet = (course, doneModules) => {
  const doneModulesId = doneModules.map(e => e.ModuleId);
  const modules = course.modules.map(module => {
    return {
      ...module.dataValues,
      done: doneModulesId.includes(module.id)
    }
  });

  return {
    name: course.name,
    progress: course.done/modules.length,
    modules,
  };
}

const get = async (req, res) => {
  try{
    const { id } = req.params;
    logger.debug('get', `course id: ${id}`);
    const course = await Course.getById(id);
    res.status(200).send({data: course});
  } catch(err){
    logger.error('get', err);
    res.status(400).send({message: err.message});
  }
}

const getUser = async (req, res) => {
  try{
    const { id, userId } = req.params;
    logger.debug('getUser', `course id: ${id}`, `user id: ${userId}`);
    const course = await Course.getUser(id, userId);
    const doneModules = await ProgressService.getDoneModules(id, userId);
    const response = generateResponseGet(course, doneModules);
    res.status(200).send({data: response});
  } catch(err){
    logger.error('getUser', err);
    res.status(400).send({message: err.message});
  }
}

const validateCourse = (body) => {
  const { name } = body;
  if (!name) {
    throw Errors.CourseErrors.INVALID_NAME;
  }
}

const create = async (req, res) => {
  try{
    const body = req.body;
    validateCourse(body);
    logger.info('create', `creating course`);
    const course = await Course.create(body);
    res.status(200).send({data: course});
  } catch(err){
    logger.error('create', err);
    res.status(400).send({message: err.message});
  }
}

const update = async (req, res) => {
  try{
    const id = req.params.id;
    logger.debug('update', `course id: ${id}`);
    const body = req.body;
    validateCourse(body);
    logger.info('update', `updating course`);
    const course = await Course.update(id, body);
    res.status(200).send({data: course});
  } catch(err){
    logger.error('update', err);
    res.status(400).send({message: err.message});
  }
}

const remove = async (req, res) => {
  try{
    const id = req.params.id;
    logger.debug('remove', `course id: ${id}`);
    const course = await Course.remove(id);
    res.status(200).send({data: course});
  } catch(err){
    logger.error('remove', err);
    res.status(400).send({message: err.message});
  }
}

const lock = async (req, res) => {
  try{
    const id = req.params.id;
    logger.debug('lock', `course id: ${id}`);
    await Course.lock(id);
    res.status(200).send();
  } catch(err){
    logger.error('lock', err);
    res.status(400).send({message: err.message});
  }
}

module.exports = {
  getAll,
  getAllAdmin,
  getUser,
  get,
  create,
  update,
  remove,
  lock
};