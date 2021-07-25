const { Answer } = require('../database/models');

const getById = async (id) => {
  try{
    const answer = await Answer.findByPk(id, {
      attributes: ["id", "answer", "QuizId"]
    });  
    return answer;
  } catch(err){
    throw 400;
  }
}

const create = async (args) => {
  try{
    const { QuizId, answer } = args;
    const answer = await Answer.create({
      answer,
      QuizId
    });  
    return answer;
  } catch(err){
    throw 400;
  }
}

const update = async (id, args) => {
  try{
    const { QuizId, answer } = args;
    const answer = await Answer.update(
      { 
        answer,
        QuizId
      },
      { where: { id } }
    );  
    return answer;
  } catch(err){
    throw 400;
  }
}

const remove = async (id) => {
  try{
    const answer = await Answer.destroy(
      { where: { id } }
    );
    return answer;
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