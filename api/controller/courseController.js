const { Course } = require('../database/models');

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
      { where: id }
    );  
    return course;
  } catch(err){
    throw 400;
  }
}

const remove = async (id) => {
  try{
    const course = await Course.destroy(
      { where: id }
    );
    return course;
  } catch(err){
    throw 400;
  }
}

module.exports = {
  create,
  update,
  remove
};