const { Quiz, Answer } = require('../database/models');

const getById = async (id) => {
  try{
    const quiz = await Quiz.findByPk(id, {
      attributes: ['id', 'title', 'question', 'hint', 'number', 'answers', 'ModuleId'],
    });  
    return quiz;
  } catch(err){
    throw 400;
  }
}

const getUser = async (id) => {
  try{
    const quiz = await Quiz.findByPk(id, {
      attributes: ['title', 'question', 'number', 'ModuleId'],
    });  
    return quiz;
  } catch(err){
    throw 400;
  }
}

const create = async (args) => {
  try{
    const { title, question, hint, number, answers, ModuleId } = args;
    const quiz = await Quiz.create({
      title, 
      question, 
      hint, 
      number, 
      answers,
      ModuleId
    });  
    return quiz;
  } catch(err){
    throw 400;
  }
}

const update = async (id, args) => {
  try{
    const { title, question, hint, number, answers } = args;
    const quiz = await Quiz.update(
      {       
        title, 
        question, 
        hint, 
        number, 
        answers,
      },
      { where: { id } }
    );  
    return quiz;
  } catch(err){
    throw 400;
  }
}

const remove = async (id) => {
  try{
    const quiz = await Quiz.destroy(
      { where: { id } }
    );
    return quiz;
  } catch(err){
    throw 400;
  }
}

const checkAnswer = async (id, answer) => {
  try{
    const quiz = await Quiz.findByPk(id, {
      attributes: ['id', 'answers'],
    });  
    const correct = quiz.answers.includes(answer);
    return correct;
  } catch(err){
    throw 400;
  }
}

module.exports = {
  getById,
  getUser,
  create,
  update,
  remove,
  checkAnswer
};