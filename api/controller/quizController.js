const { Quiz } = require('../database/models');

const create = async (args) => {
  try{
    const { title, question, hint, number, ModuleId } = args;
    const quiz = await Quiz.create({
      title, 
      question, 
      hint, 
      number, 
      ModuleId
    });  
    return quiz;
  } catch(err){
    throw 400;
  }
}

const update = async (id, args) => {
  try{
    const { title, question, hint, number, ModuleId } = args;
    const quiz = await Quiz.update(
      {       
        title, 
        question, 
        hint, 
        number, 
        ModuleId 
      },
      { where: id }
    );  
    return quiz;
  } catch(err){
    throw 400;
  }
}

const remove = async (id) => {
  try{
    const quiz = await Quiz.destroy(
      { where: id }
    );
    return quiz;
  } catch(err){
    throw 400;
  }
}

module.exports = {
  create,
  update,
  remove
};