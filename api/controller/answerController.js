const { Answer } = require('../database/models');

const create = async (args) => {
  try{
    const { quiz_id, answer } = args;
    const answer = await Answer.create({
      answer,
      quiz_id
    });  
    return answer;
  } catch(err){
    throw 400;
  }
}

const update = async (id, args) => {
  try{
    const { quiz_id, answer } = args;
    const answer = await Answer.update(
      { 
        answer,
        quiz_id
      },
      { where: id }
    );  
    return answer;
  } catch(err){
    throw 400;
  }
}

const remove = async (id) => {
  try{
    const answer = await Answer.destroy(
      { where: id }
    );
    return answer;
  } catch(err){
    throw 400;
  }
}

module.exports = {
  create,
  update,
  remove
};