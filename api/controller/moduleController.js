const { Module } = require('../database/models');

const create = async (args) => {
  try{
    const { name, number, course_id } = args;
    const module = await Module.create({
      name, 
      number, 
      course_id
    });  
    return module;
  } catch(err){
    throw 400;
  }
}

const update = async (id, args) => {
  try{
    const { name } = args;
    const module = await Module.update(
      {       
        name, 
        number, 
        course_id 
      },
      { where: id }
    );  
    return module;
  } catch(err){
    throw 400;
  }
}

const remove = async (id) => {
  try{
    const module = await Module.destroy(
      { where: id }
    );
    return module;
  } catch(err){
    throw 400;
  }
}

module.exports = {
  create,
  update,
  remove
};