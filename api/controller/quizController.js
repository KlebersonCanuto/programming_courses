const { Quiz, Sequelize } = require('../database/models');
const Logger = require('../utils/logger');

const logger = new Logger('quizController');

const getById = async (id) => {
  try{
    const quiz = await Quiz.findByPk(id, {
      attributes: ['id', 'title', 'question', 'hint', 'number', 'answers', 'ModuleId'],
    });  
    return quiz;
  } catch(err){
    logger.error('getById', err);
    throw 400;
  }
}

const getHint = async (id) => {
  try{
    const quiz = await Quiz.findByPk(id, {
      attributes: ['id', 'hint'],
    });  
    return quiz.hint;
  } catch(err){
    logger.error('getHint', err);
    throw 400;
  }
}

const getUser = async (id, userId) => {
  try{
    const quiz = await Quiz.findByPk(id, {
      attributes: {
        include: [
          Sequelize.literal(`(
            SELECT COUNT(*) > 0
            FROM QuizUsers
            WHERE
                quiz_id = ${id}
                AND
                user_id = ${userId}
                AND
                done = true 
          ) AS done`)
        ],
        exclude: ['answers', 'hint', 'createdAt', 'updatedAt']
      }
    });  
    return quiz;
  } catch(err){
    logger.error('getUser', err);
    throw 400;
  }
}

const getWithoutAnswers = async (id) => {
  try {
    const quiz = await Quiz.findByPk(id, {
      attributes: ['id', 'title', 'question', 'number', 'ModuleId'],
    });  
    return quiz;
  } catch (err) {
    logger.error('getWithoutAnswers', err);
    throw 400;
  }
}

const getByModule = async (ModuleId) => {
  try{
    const quizzes = await Quiz.findAll({ 
      where: { ModuleId },
      attributes: ['id']
    });  
    return quizzes;
  } catch(err){
    logger.error('getByModule', err);
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
    logger.error('create', err);
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
    logger.error('update', err);
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
    logger.error('remove', err);
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

const checkCourseLocked = async (id) => {
  try{
    const quiz = await Quiz.findByPk(id, {
      attributes: [
        Sequelize.literal(`(
          SELECT locked
          FROM Courses
          WHERE
              id = (
                SELECT course_id 
                FROM Modules
                WHERE
                  id = module_id
              )
        ) AS locked`),
      ]
    });  
    return quiz.locked;
  } catch(err){
    logger.error('checkCourseLocked', err);
    throw 400;
  }
}

module.exports = {
  getById,
  getUser,
  getHint,
  getWithoutAnswers,
  getByModule,
  create,
  update,
  remove,
  checkAnswer,
  checkCourseLocked
};