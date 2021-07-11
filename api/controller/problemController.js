const { Problem } = require('../database/models');

const create = async (args) => {
  try{
    const { title, description, module_id } = args;
    const problem = await Problem.create({
      title, 
      description, 
      module_id
    });  
    return problem;
  } catch(err){
    throw 400;
  }
}

const update = async (id, args) => {
  try{
    const { title, description, module_id } = args;
    const problem = await Problem.update(
      {       
        title, 
        description, 
        module_id 
      },
      { where: id }
    );  
    return problem;
  } catch(err){
    throw 400;
  }
}

const remove = async (id) => {
  try{
    const problem = await Problem.destroy(
      { where: id }
    );
    return problem;
  } catch(err){
    throw 400;
  }
}

module.exports = {
  create,
  update,
  remove
};