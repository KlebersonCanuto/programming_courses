const { Module, Material, Quiz, Problem, Sequelize } = require('../database/models');
const Logger = require('../utils/logger');
const Errors = require('../utils/errors');

const logger = new Logger('moduleController');

const getById = async (id) => {
	try{
		const module = await Module.findByPk(id, {
			attributes: ['id', 'name', 'number', 'CourseId'],
			include: [
				{ model: Material, as: 'materials', attributes: ['id', 'title', 'content', 'complementary', 'number']},
				{ model: Quiz, as: 'quizzes', attributes: ['id', 'title', 'question', 'number']},
				{ model: Problem, as: 'problems', attributes: ['id', 'title', 'description']},
			]
		});  
		return module;
	} catch(err){
		logger.error('getById', err);
		throw Errors.ModuleErrors.FAILED_TO_GET_MODULE;
	}
};

const getByIdAndUser = async (id, userId) => {
	try{
		const module = await Module.findByPk(id, {
			attributes: {
				include: [
					'id', 'name', 'number', 'CourseId',
					Sequelize.literal(`(
						SELECT conclusionMaterials
						FROM ModuleUsers
						WHERE
							module_id = ${id}
							AND
							user_id = ${userId}
					) AS doneMaterials`),
					Sequelize.literal(`(
						SELECT conclusionQuizzes
						FROM ModuleUsers
						WHERE
							module_id = ${id}
							AND
							user_id = ${userId}
					) AS doneQuizzes`),
					Sequelize.literal(`(
						SELECT conclusionProblems
						FROM ModuleUsers
						WHERE
							module_id = ${id}
							AND
							user_id = ${userId}
					) AS doneProblems`),
				]
			},
			include: [
				{ model: Material, as: 'materials', attributes: ['id', 'title', 'complementary', 'number']},
				{ model: Quiz, as: 'quizzes', attributes: ['id', 'title', 'number']},
				{ model: Problem, as: 'problems', attributes: ['id', 'title']},
			]
		});  
		return module;
	} catch(err){
		logger.error('getByIdAndUser', err);
		throw Errors.ModuleErrors.FAILED_TO_GET_MODULE;
	}
};

const getByCourse = async (CourseId) => {
	try{
		const modules = await Module.findAll({ 
			where: { CourseId }, 
			attributes: ['id']
		});  
		return modules;
	} catch(err){
		logger.error('getByCourse', err);
		throw Errors.ModuleErrors.FAILED_TO_GET_MODULE;
	}
};

const create = async (args) => {
	try{
		const { name, number, CourseId } = args;
		const module = await Module.create({
			name, 
			number, 
			CourseId
		});  
		return module;
	} catch(err){
		logger.error('create', err);
		throw Errors.ModuleErrors.FAILED_TO_CREATE_MODULE;
	}
};

const update = async (id, args) => {
	try{
		const { name, number } = args;
		const module = await Module.update(
			{       
				name, 
				number
			},
			{ where: { id } }
		);  
		return module;
	} catch(err){
		logger.error('update', err);
		throw Errors.ModuleErrors.FAILED_TO_UPDATE_MODULE;
	}
};

const remove = async (id) => {
	try{
		const module = await Module.destroy(
			{ where: { id } }
		);
		return module;
	} catch(err){
		logger.error('remove', err);
		throw Errors.ModuleErrors.FAILED_TO_REMOVE_MODULE;
	}
};

const checkCourseLocked = async (id) => {
	try{
		const module = await Module.findByPk(id, {
			attributes: [
				Sequelize.literal(`(
					SELECT locked
					FROM Courses
					WHERE
						id = course_id
				) AS locked`),
			]
		});  
		return module.locked;
	} catch(err){
		logger.error('checkCourseLocked', err);
		throw Errors.ModuleErrors.FAILED_TO_CHECK_COURSE_LOCKED;
	}
};


module.exports = {
	getById,
	getByIdAndUser,
	getByCourse,
	create,
	update,
	remove,
	checkCourseLocked
};