const { Test } = require('../database/models');

const create = async (args) => {
  try{
    const { input, output, example, problem_id } = args;
    const test = await Test.create({
      input, 
      output, 
      example, 
      problem_id
    });  
    return test;
  } catch(err){
    throw 400;
  }
}

const update = async (id, args) => {
  try{
    const { input, output, example, problem_id } = args;
    const test = await Test.update(
      {       
        input, 
        output, 
        example, 
        problem_id 
      },
      { where: id }
    );  
    return test;
  } catch(err){
    throw 400;
  }
}

const remove = async (id) => {
  try{
    const test = await Test.destroy(
      { where: id }
    );
    return test;
  } catch(err){
    throw 400;
  }
}

module.exports = {
  create,
  update,
  remove
};