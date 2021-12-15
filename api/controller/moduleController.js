const { Module, Material, Quiz, Problem } = require('../database/models');

const getById = async (id) => {
  try{
    const module = await Module.findByPk(id, {
      attributes: ['id', 'name', 'number', 'CourseId'],
      include: [
        { model: Material, as: 'materials', attributes: ['id', 'title', 'content', 'complementary', 'number']},
        { model: Quiz, as: 'quizzes', attributes: ['id', 'title', 'question', 'number']},
        { model: Problem, as: 'problems', attributes: ['id', 'title', 'description']},
      ]
    });  
    return module;
  } catch(err){
    throw 400;
  }
}

const getByCourse = async (CourseId) => {
  try{
    const modules = await Module.findAll({ 
      where: { CourseId }, 
      attributes: ['id']
    });  
    return modules;
  } catch(err){
    throw 400;
  }
}

const create = async (args) => {
  try{
    const { name, number, CourseId } = args;
    const module = await Module.create({
      name, 
      number, 
      CourseId
    });  
    return module;
  } catch(err){
    throw 400;
  }
}

const update = async (id, args) => {
  try{
    const { name, number } = args;
    const module = await Module.update(
      {       
        name, 
        number
      },
      { where: { id } }
    );  
    return module;
  } catch(err){
    throw 400;
  }
}

const remove = async (id) => {
  try{
    const module = await Module.destroy(
      { where: { id } }
    );
    return module;
  } catch(err){
    throw 400;
  }
}

module.exports = {
  getById,
  getByCourse,
  create,
  update,
  remove
};