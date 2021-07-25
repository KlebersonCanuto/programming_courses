const { Module, Material, Quiz } = require('../database/models');

const getById = async (id) => {
  try{
    const module = await Module.findByPk(id, {
      attributes: ["id", "name", "number", "CourseId"],
      include: [
        { model: Material, as: "materials", attributes: ["id", "title", "content", "complementary", "number"]},
        { model: Quiz, as: "quizzes", attributes: ["id", "title", "question", "number"]}
      ]
    });  
    return module;
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
    const { name } = args;
    const module = await Module.update(
      {       
        name, 
        number, 
        CourseId 
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
  create,
  update,
  remove
};