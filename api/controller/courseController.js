const { Course, Module } = require('../database/models');

const getAll = async () => {
  try{
    const course = await Course.findAll({
      attributes: ["id", "name"],
    });  
    return course;
  } catch(err){
    throw 400;
  }
}


const getById = async (id) => {
  try{
    const course = await Course.findByPk(id, {
      attributes: ["id", "name"],
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
  getAll,
  getById,
  create,
  update,
  remove
};