const { Course, Module, Sequelize } = require('../database/models');
const Logger = require('../utils/logger');
const Errors = require('../utils/errors');

const logger = new Logger('courseController');

const getAll = async () => {
  try{
    const courses = await Course.findAll({
      attributes: ['id', 'name', 'locked']
    });  
    return courses;
  } catch(err){
    logger.error('getAll', err);
    throw Errors.CourseErrors.FAILED_TO_GET_COURSES;
  }
}

const getAllLocked = async () => {
  try{
    const courses = await Course.findAll({
      attributes: ['id', 'name'],
      where: { locked: true }
    });  
    return courses;
  } catch(err){
    logger.error('getAllLocked', err);
    throw Errors.CourseErrors.FAILED_TO_GET_COURSES;
  }
}

const getAllUser = async (userId) => {
  try{
    const courses = await Course.findAll({
      where: { locked: true },
      attributes: {
        include: [
          Sequelize.literal(`(
            SELECT COUNT(*) > 0
            FROM CourseUsers
            WHERE
                course_id = Course.id
                AND
                user_id = ${userId}
                AND
                conclude = true
          ) AS done`)
        ],
      exclude: ['createdAt', 'updatedAt'],
      },
    });  
    return courses;
  } catch(err){
    logger.error('getAllUser', err);
    throw Errors.CourseErrors.FAILED_TO_GET_COURSES;
  }
}


const getUser = async (id, userId) => {
  try{
    const course = await Course.findOne({
      where: { locked: true, id },
      attributes: {
        include: [
          Sequelize.literal(`(
            SELECT conclusion
            FROM CourseUsers
            WHERE
                course_id = ${id}
                AND
                user_id = ${userId}
          ) AS done`)
        ],
        exclude: ['createdAt', 'updatedAt']
      },
      include: [
        { model: Module, as: "modules", attributes: ["id", "name", "number"]}
      ]
    });  
    return course;
  } catch(err){
    logger.error('getUser', err);
    throw Errors.CourseErrors.FAILED_TO_GET_COURSE;
  }
}

const getById = async (id) => {
  try{
    const course = await Course.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: [
        { model: Module, as: "modules", attributes: ["id", "name", "number"]}
      ]
    });  
    return course;
  } catch(err){
    logger.error('getById', err);
    throw Errors.CourseErrors.FAILED_TO_GET_COURSE;
  }
}

const create = async (args) => {
  try{
    const { name } = args;
    const course = await Course.create({
      name,
    });  
    return course;
  } catch(err){
    logger.error('create', err);
    throw Errors.CourseErrors.FAILED_TO_CREATE_COURSE;
  }
}

const update = async (id, args) => {
  try{
    const { name } = args;
    const course = await Course.update(
      { name },
      { where: { id } }
    );  
    return course;
  } catch(err){
    logger.error('update', err);
    throw Errors.CourseErrors.FAILED_TO_UPDATE_COURSE;
  }
}

const remove = async (id) => {
  try{
    const course = await Course.destroy(
      { where: { id } }
    );
    return course;
  } catch(err){
    logger.error('remove', err);
    throw Errors.CourseErrors.FAILED_TO_REMOVE_COURSE;
  }
}

const lock = async (id) => {
  try{
    const course = await Course.update(
      { locked: true },
      { where: { id } }
    );  
    return course;
  } catch(err){
    logger.error('lock', err);
    throw Errors.CourseErrors.FAILED_TO_LOCK_COURSE;
  }
}

const checkCourseLocked = async (id) => {
  try{
    const course = await Course.findByPk(id, {
      attributes: ['locked']
    });  
    return course.locked;
  } catch(err){
    logger.error('checkCourseLocked', err);
    throw Errors.CourseErrors.FAILED_TO_CHECK_COURSE_LOCKED;
  }
}

module.exports = {
  getAll,
  getAllLocked,
  getAllUser,
  getUser,
  getById,
  create,
  update,
  remove,
  lock,
  checkCourseLocked
};