const Progress = require('../controller/progressController');
const Material = require('../controller/materialController');
const Logger = require('../utils/logger');

const logger = new Logger('progressService');

const getPoints = async (userId) => {
	try {
		logger.debug('getPoints', `user id: ${userId}`);
		const points = await Progress.getPoints(userId);
		return points;
	} catch (err) {
		logger.error('getPoints', err);
		throw err;
	}
};

const getDoneModules = async (CourseId, UserId) => {
	try {
		logger.debug('getDoneModules', `course id: ${CourseId}`, `user id: ${UserId}`);
		const doneModules = await Progress.getDoneModules(CourseId, UserId);
		return doneModules;
	} catch (err) {
		logger.error('getDoneModules', err);
		throw err;
	}
};

const getDoneQuizzes = async (ModuleId, UserId) => {
	try {
		logger.debug('getDoneQuizzes', `module id: ${ModuleId}`, `user id: ${UserId}`);
		const doneQuizzes = await Progress.getDoneQuizzes(ModuleId, UserId);
		return doneQuizzes;
	} catch (err) {
		logger.error('getDoneQuizzes', err);
		throw err;
	}
};

const getDoneMaterials = async (ModuleId, UserId) => {
	try {
		logger.debug('getDoneMaterials', `module id: ${ModuleId}`, `user id: ${UserId}`);
		const doneMaterials = await Progress.getDoneMaterials(ModuleId, UserId);
		return doneMaterials;
	} catch (err) {
		logger.error('getDoneMaterials', err);
		throw err;
	}
};

const getDoneProblems = async (ModuleId, UserId) => {
	try {
		logger.debug('getDoneProblems', `module id: ${ModuleId}`, `user id: ${UserId}`);
		const doneProblems = await Progress.getDoneProblems(ModuleId, UserId);
		return doneProblems;
	} catch (err) {
		logger.error('getDoneProblems', err);
		throw err;
	}
};

const saveMaterial = async (id, userId) => {
	try {
		logger.debug('saveMaterial', `material id: ${id}`, `user id: ${userId}`);
		const progress = await Progress.getMaterial(id, userId);
		logger.debug('saveMaterial', `progress: ${progress}`);
		if (!progress) {
			const material = await Material.getById(id);
			await Progress.saveMaterial(userId, material);
		}
	} catch (err) {
		logger.error('saveMaterial', err);
		throw err;
	}
};

const saveQuiz = async (id, userId, done) => {
	try {
		logger.debug('saveQuiz', `quiz id: ${id}`, `user id: ${userId}`);
		const progress = await Progress.getQuiz(id, userId);
		logger.debug('saveQuiz', `progress: ${progress}`);
		if (!progress || !progress.done) {
			await Progress.saveQuiz(id, userId, progress, done);
		}
	} catch (err) {
		logger.error('saveQuiz', err);
		throw err;
	}
};

const saveProblem = async (id, userId, done) => {
	try {
		logger.debug('saveProblem', `problem id: ${id}`, `user id: ${userId}`);
		const progress = await Progress.getProblem(id, userId);
		logger.debug('saveProblem', `progress: ${progress}`);
		if (!progress || !progress.done) {
			await Progress.saveProblem(id, userId, progress, done);
		}
	} catch (err) {
		logger.error('saveProblem', err);
		throw err;
	}
};

const saveOracle = async (id, userId, inputOnly, correct) => {
	try {
		logger.debug('saveOracle', `problem id: ${id}`, `user id: ${userId}`);
		const progress = await Progress.getProblem(id, userId);
		logger.debug('saveOracle', `progress: ${progress}`);
		if (!progress || !progress.done) {
			await Progress.saveOracle(id, userId, progress, inputOnly, correct);
		}
	} catch (err) {
		logger.error('saveOracle', err);
		throw err;
	}
};

const saveHint = async (id, userId) => {
	try {
		logger.debug('saveHint', `quiz id: ${id}`, `user id: ${userId}`);
		const progress = await Progress.getQuiz(id, userId);
		logger.debug('saveHint', `progress: ${progress}`);
		if (!progress || !progress.done) {
			await Progress.saveHint(id, userId, progress);
		}
	} catch (err) {
		logger.error('saveHint', err);
		throw err;
	}
};

const ranking = async () => {
	try{
		const rank = await Progress.ranking();
		return rank;
	} catch(err){
		logger.error('ranking', err);
		throw err;
	}
};

module.exports = {
	getPoints,
	getDoneModules,
	getDoneQuizzes,
	getDoneMaterials,
	getDoneProblems,
	saveMaterial,
	saveProblem,
	saveQuiz,
	saveOracle,
	saveHint,
	ranking
};