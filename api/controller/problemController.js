const { Problem } = require('../database/models');

const getById = async (id) => {
  try{
    const problem = await Problem.findByPk(id, {
      attributes: ["id", "title", "description"],
    });  
    return problem;
  } catch(err){
    throw 400;
  }
}

const create = async (args, file_id) => {
  try{
    const { title, description, ModuleId } = args;
    const problem = await Problem.create({
      title, 
      description, 
      file_id,
      ModuleId
    });  
    return problem;
  } catch(err){
    throw 400;
  }
}

const update = async (id, args, file_id) => {
  try{
    const { title, description } = args;
    let updateAttributes = {
      title, 
      description
    }
    if (file_id) {
      updateAttributes.file_id = file_id;
    }
    const problem = await Problem.update(
      updateAttributes,
      { where: { id } }
    );  
    return problem;
  } catch(err){
    throw 400;
  }
}

const remove = async (id) => {
  try{
    const problem = await Problem.destroy(
      { where: { id } }
    );
    return problem;
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