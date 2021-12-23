const { Course, Module, Sequelize } = require('../database/models');

const getAll = async () => {
  try{
    const course = await Course.findAll({
      attributes: ['id', 'name']
    });  
    return course;
  } catch(err){
    throw 400;
  }
}

const getAllUser = async (userId) => {
  try{
    const course = await Course.findAll({
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
    return course;
  } catch(err){
    throw 400;
  }
}


const getUser = async (id, userId) => {
  try{
    const course = await Course.findByPk(id, {
      attributes: {
        include: [
          Sequelize.literal(`(
            SELECT COUNT(*) > 0
            FROM CourseUsers
            WHERE
                course_id = ${id}
                AND
                user_id = ${userId}
                AND
                conclude=true 
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

module.exports = {
  getAll,
  getAllUser,
  getUser,
  create,
  update,
  remove,
  lock
};