const { Quiz, Sequelize } = require('../database/models');
const Logger = require('../utils/logger');
const Errors = require('../utils/errors');

const logger = new Logger('quizController');

const getById = async (id) => {
	try{
		const quiz = await Quiz.findByPk(id, {
			attributes: ['id', 'title', 'question', 'hint', 'number', 'answers', 'ModuleId'],
		});  
		return quiz;
	} catch(err){
		logger.error('getById', err);
		throw Errors.QuizErrors.FAILED_TO_GET_QUIZ;
	}
};

const getHint = async (id) => {
	try{
		const quiz = await Quiz.findByPk(id, {
			attributes: ['id', 'hint'],
		});  
		return quiz.hint;
	} catch(err){
		logger.error('getHint', err);
		throw Errors.QuizErrors.FAILED_TO_GET_QUIZ;
	}
};

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
					) AS done`),
				],
				exclude: ['answers', 'hint', 'createdAt', 'updatedAt']
			}
		});  
		return quiz;
	} catch(err){
		logger.error('getUser', err);
		throw Errors.QuizErrors.FAILED_TO_GET_QUIZ;
	}
};

const getWithoutAnswers = async (id) => {
	try {
		const quiz = await Quiz.findByPk(id, {
			attributes: ['id', 'title', 'question', 'number', 'ModuleId'],
		});  
		return quiz;
	} catch (err) {
		logger.error('getWithoutAnswers', err);
		throw Errors.QuizErrors.FAILED_TO_GET_QUIZ;
	}
};

const getByModule = async (ModuleId) => {
	try{
		const quizzes = await Quiz.findAll({ 
			where: { ModuleId },
			attributes: ['id']
		});  
		return quizzes;
	} catch(err){
		logger.error('getByModule', err);
		throw Errors.QuizErrors.FAILED_TO_GET_QUIZ;
	}
};

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
		throw Errors.QuizErrors.FAILED_TO_CREATE_QUIZ;
	}
};

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
		throw Errors.QuizErrors.FAILED_TO_UPDATE_QUIZ;
	}
};

const remove = async (id) => {
	try{
		const quiz = await Quiz.destroy(
			{ where: { id } }
		);
		return quiz;
	} catch(err){
		logger.error('remove', err);
		throw Errors.QuizErrors.FAILED_TO_REMOVE_QUIZ;
	}
};

const checkAnswer = async (id, answer) => {
	try{
		const quiz = await Quiz.findByPk(id, {
			attributes: ['id', 'answers'],
		});  
		const correct = quiz.answers.includes(answer);
		return correct;
	} catch(err){
		throw Errors.QuizErrors.FAILED_TO_CHECK_ANSWER;
	}
};

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
		throw Errors.QuizErrors.FAILED_TO_CHECK_COURSE_LOCKED;
	}
};

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