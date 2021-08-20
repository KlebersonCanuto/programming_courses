const { Test } = require('../database/models');

const createMany = async (args) => {
  try{
    const tests = await Test.bulkCreate(args);  
    return tests;
  } catch(err){
    throw 400;
  }
}

const update = async (id, args) => {
  try{
    const { input, output, example, ProblemId } = args;
    const test = await Test.update(
      {       
        input, 
        output, 
        example, 
        ProblemId 
      },
      { where: { id } }
    );  
    return test;
  } catch(err){
    throw 400;
  }
}

const remove = async (id) => {
  try{
    const test = await Test.destroy(
      { where: { id } }
    );
    return test;
  } catch(err){
    throw 400;
  }
}

module.exports = {
  createMany,
  update,
  remove
};