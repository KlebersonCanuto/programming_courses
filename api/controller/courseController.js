const { Course, Module, Sequelize } = require('../database/models');

const getAll = async () => {
  try{
    const courses = await Course.findAll({
      attributes: ['id', 'name', 'locked']
    });  
    return courses;
  } catch(err){
    throw 400;
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
    throw 400;
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
    throw 400;
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
    throw 400;
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
    throw 400;
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
    throw 400;
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
    throw 400;
  }
}

const remove = async (id) => {
  try{
    const course = await Course.destroy(
      { where: { id } }
    );
    return course;
  } catch(err){
    throw 400;
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
    throw 400;
  }
}

const checkCourseLocked = async (id) => {
  try{
    const course = await Course.findByPk(id, {
      attributes: ['locked']
    });  
    return course.locked;
  } catch(err){
    throw 400;
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