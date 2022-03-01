const Module = require('../controller/moduleController');
const ProgressService = require('./progressService');
const Logger = require('../utils/logger');
const Errors = require('../utils/errors');

const logger = new Logger('moduleService');

const generateResponseGet = (module, doneQuizzes, doneMaterials, doneProblems) => {
	const doneQuizzesId = doneQuizzes.map(e => e.QuizId);
	const quizzes = module.quizzes.map(quiz => {
		return {
			...quiz.dataValues,
			done: doneQuizzesId.includes(quiz.id)
		};
	});

	const doneMaterialsId = doneMaterials.map(e => e.MaterialId);
	const materials = module.materials.map(material => {
		return {
			...material.dataValues,
			done: doneMaterialsId.includes(material.id)
		};
	});

	const doneProblemsId = doneProblems.map(e => e.ProblemId);
	const problems = module.problems.map(problem => {
		return {
			...problem.dataValues,
			done: doneProblemsId.includes(problem.id)
		};
	});

	const mandatoryMaterials = materials.filter(e => !e.complementary);
	const mandatoryMaterialsDone = mandatoryMaterials.filter(e => e.done).length;

	return {
		name: module.name,
		progressMaterials: mandatoryMaterials.length ? mandatoryMaterialsDone / mandatoryMaterials.length : 1,
		progressProblems: problems.length ? module.doneProblems / problems.length : 1,
		progressQuizzes: quizzes.length ? module.doneQuizzes / quizzes.length : 1,
		materials,
		quizzes,
		problems,
	};
};

const getUser = async (req, res) => {
	try{
		const { id, userId } = req.params;
		logger.debug('getUser', `module id: ${id}`, `user id: ${userId}`);
		let response;
		if (userId) {
			const module = await Module.getByIdAndUser(id, userId);
			logger.info('getUser', 'getting done quizzes');
			const doneQuizzes = await ProgressService.getDoneQuizzes(id, userId);
			logger.info('getUser', 'getting done materials');
			const doneMaterials = await ProgressService.getDoneMaterials(id, userId);
			logger.info('getUser', 'getting done problems');
			const doneProblems = await ProgressService.getDoneProblems(id, userId);
			response = generateResponseGet(module, doneQuizzes, doneMaterials, doneProblems);
		} else {
			response = await Module.getById(id);
		}
		res.status(200).send({data: response});
	} catch(err){
		logger.error('getUser', err);
		res.status(400).send({message: err.message});
	}
};

const get = async (req, res) => {
	try{
		const id = req.params.id;
		logger.debug('get', `module id: ${id}`);
		const module = await Module.getById(id);
		res.status(200).send({data: module});
	} catch(err){
		logger.error('get', err);
		res.status(400).send({message: err.message});
	}
};

const validateCreate = (body) => {
	const { name, CourseId } = body;
	if (!name) {
		throw Errors.ModuleErrors.INVALID_NAME;
	}
	if (!CourseId) {
		throw Errors.ModuleErrors.INVALID_COURSE_ID;
	}
};

const create = async (req, res) => {
	try{
		const body = req.body;
		validateCreate(body);
		logger.info('create', 'creating module');
		const module = await Module.create(body);
		res.status(200).send({data: module});
	} catch(err){
		logger.error('create', err);
		res.status(400).send({message: err.message});
	}
};

const validateUpdate = (body) => {
	const { name } = body;
	if (!name) {
		throw Errors.ModuleErrors.INVALID_NAME;
	}
};

const update = async (req, res) => {
	try{
		const id = req.params.id;
		logger.debug('update', `module id: ${id}`);
		const body = req.body;
		validateUpdate(body);
		const module = await Module.update(id, body);
		res.status(200).send({data: module});
	} catch(err){
		logger.error('update', err);
		res.status(400).send({message: err.message});
	}
};

const remove = async (req, res) => {
	try{
		const id = req.params.id;
		logger.debug('remove', `module id: ${id}`);
		const module = await Module.remove(id);
		res.status(200).send({data: module});
	} catch(err){
		logger.error('remove', err);
		res.status(400).send({message: err.message});
	}
};

module.exports = {
	get,
	getUser,
	create,
	update,
	remove
};