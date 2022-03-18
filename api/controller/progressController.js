const { MaterialUser, PointsUser, ProblemUser, QuizUser, ModuleUser, CourseUser, Sequelize } = require('../database/models');
const Quiz = require('./quizController');
const Problem = require('./problemController');
const Material = require('./materialController');
const Module = require('./moduleController');
const Logger = require('../utils/logger');
const Errors = require('../utils/errors');

const logger = new Logger('progressController');

const addPoints = async (UserId, points) => {
	try {
		const pointsUser = await PointsUser.findOne({ where: { UserId } });
		if (!pointsUser) {
			logger.debug('addPoints', `creating points to user ${UserId}`);
			await PointsUser.create({
				UserId,
				points
			});
		} else {
			logger.debug('addPoints', `updating user ${UserId} points`);
			await PointsUser.update({
				points: Sequelize.literal(`points + ${points}`)
			}, { where: { id: pointsUser.id }});
		}
		return;
	} catch (err) {
		logger.error('addPoints', err);
		throw Errors.ProgressErrors.FAILED_TO_ADD_POINTS;
	}
};

const checkCourseComplete = async (UserId, CourseId) => {
	try {
		const courseUser = await CourseUser.findOne({ 
			where: { UserId, CourseId },
			attributes: ['id', 'conclusion', 'CourseId', 'UserId']
		});
		const modules = await Module.getByCourse(CourseId);
		const total = modules.length;

		let id;
		let conclude = false;
		let conclusion = false;
		if (!courseUser) {
			logger.debug('checkCourseComplete', `creating courseUser to user ${UserId} and course ${CourseId}`);
			conclusion = 1;
			conclude = total === conclusion;
			const mu = await CourseUser.create({CourseId, UserId, conclusion, conclude});
			id = mu.id;
		} else {
			logger.debug('checkCourseComplete', `updating courseUser to user ${UserId} and course ${CourseId}`);
			id = courseUser.id;
			conclusion = courseUser.conclusion + 1;
			conclude = total === conclusion;
			await CourseUser.update({CourseId, UserId, conclusion, conclude}, {where: {id}});
		}

		if (conclude) {
			logger.debug('checkCourseComplete', `user ${UserId} completed course ${CourseId}`);
			await addPoints(UserId, 10);
		}
	} catch (err) {
		logger.error('checkCourseComplete', err);
		throw Errors.ProgressErrors.FAILED_TO_CHECK_COURSE_COMPLETED;
	}
};

const checkModuleComplete = async (id) => {
	try {
		const moduleUser = await ModuleUser.findByPk(id, {
			attributes: ['conclusionMaterials', 'concludeMaterials', 'ModuleId', 'UserId',
				'conclusionQuizzes', 'concludeQuizzes', 'conclusionProblems', 'concludeProblems']
		});
		const UserId = moduleUser.UserId;
		const module = await Module.getById(moduleUser.ModuleId);
		const CourseId = module.CourseId;
		if (moduleUser.conclusionMaterials === module.materials.filter(e => !e.complementary).length &&
    moduleUser.conclusionQuizzes === module.quizzes.length && moduleUser.conclusionProblems === module.problems.length) {
			logger.debug('checkModuleComplete', `user ${moduleUser.UserId} completed module ${moduleUser.ModuleId}`);
			await ModuleUser.update({concludeProblems: true, concludeMaterials: true, concludeQuizzes: true}, {where: {id}});
			await checkCourseComplete(UserId, CourseId);
			await addPoints(UserId, 3);
		}
	} catch (err) {
		logger.error('checkModuleComplete', err);
		throw Errors.ProgressErrors.FAILED_TO_CHECK_MODULE_COMPLETED;
	}
};

const materialModuleProgress = async (ModuleId, UserId) => {
	try {
		const materials = await Material.getNotComplementary(ModuleId);
		const moduleUser = await ModuleUser.findOne({ 
			where: { ModuleId, UserId },
			attributes: ['conclusionMaterials', 'id']
		});
		const total = materials.length;
		let id;
		let concludeMaterials = false;
		let conclusionMaterials = false;
		if (!moduleUser) {
			logger.debug('materialModuleProgress', `creating moduleUser to user ${UserId} and module ${ModuleId}`);
			conclusionMaterials = 1;
			concludeMaterials = total === conclusionMaterials;
			const mu = await ModuleUser.create({ModuleId, UserId, conclusionMaterials, concludeMaterials});
			id = mu.id;
		} else {
			logger.debug('materialModuleProgress', `updating moduleUser to user ${UserId} and module ${ModuleId}`);
			id = moduleUser.id;
			conclusionMaterials = moduleUser.conclusionMaterials + 1;
			concludeMaterials = total === conclusionMaterials;
			await ModuleUser.update({ModuleId, UserId, conclusionMaterials, concludeMaterials}, {where: {id}});
		}
    
		if (concludeMaterials) {
			logger.debug('materialModuleProgress', `user ${UserId} completed module ${ModuleId} materials`);
			await checkModuleComplete(id);
			await addPoints(UserId, 1);
		}
	} catch (err) {
		logger.error('materialModuleProgress', err);
		throw Errors.ProgressErrors.FAILED_TO_SAVE_MATERIAL_MODULE_PROGRESS;
	}
};

const quizModuleProgress = async (QuizId, UserId) => {
	try {
		const quiz = await Quiz.getById(QuizId);
		const ModuleId = quiz.ModuleId;
		const quizzes = await Quiz.getByModule(ModuleId);
		const moduleUser = await ModuleUser.findOne({ 
			where: { ModuleId, UserId },
			attributes: ['conclusionQuizzes', 'id']
		});
		const total = quizzes.length;
		let id;
		let concludeQuizzes = false;
		let conclusionQuizzes = false;
		if (!moduleUser) {
			logger.debug('quizModuleProgress', `creating moduleUser to user ${UserId} and module ${ModuleId}`);
			conclusionQuizzes = 1;
			concludeQuizzes = total === conclusionQuizzes;
			const mu = await ModuleUser.create({ModuleId, UserId, conclusionQuizzes, concludeQuizzes});
			id = mu.id;
		} else {
			logger.debug('quizModuleProgress', `updating moduleUser to user ${UserId} and module ${ModuleId}`);
			id = moduleUser.id;
			conclusionQuizzes = moduleUser.conclusionQuizzes + 1;
			concludeQuizzes = total === conclusionQuizzes;
			await ModuleUser.update({ModuleId, UserId, conclusionQuizzes, concludeQuizzes}, {where: {id}});
		}
    
		if (concludeQuizzes) {
			logger.debug('quizModuleProgress', `user ${UserId} completed module ${ModuleId} quizzes`);
			await checkModuleComplete(id);
			await addPoints(UserId, 2);
		}
	} catch (err) {
		logger.error('quizModuleProgress', err);
		throw Errors.ProgressErrors.FAILED_TO_SAVE_QUIZ_MODULE_PROGRESS;
	}
};

const problemModuleProgress = async (ProblemId, UserId) => {
	try {
		const problem = await Problem.getById(ProblemId);
		const ModuleId = problem.ModuleId;
		const problems = await Problem.getByModule(ModuleId);
		const moduleUser = await ModuleUser.findOne({ 
			where: { ModuleId, UserId },
			attributes: ['conclusionProblems', 'id']
		});
		const total = problems.length;
		let id;
		let concludeProblems = false;
		let conclusionProblems = false;
		if (!moduleUser) {
			logger.debug('problemModuleProgress', `creating moduleUser to user ${UserId} and module ${ModuleId}`);
			conclusionProblems = 1;
			concludeProblems = total === conclusionProblems;
			const mu = await ModuleUser.create({ModuleId, UserId, conclusionProblems, concludeProblems});
			id = mu.id;
		} else {
			logger.debug('problemModuleProgress', `updating moduleUser to user ${UserId} and module ${ModuleId}`);
			id = moduleUser.id;
			conclusionProblems = moduleUser.conclusionProblems + 1;
			concludeProblems = total === conclusionProblems;
			await ModuleUser.update({ModuleId, UserId, conclusionProblems, concludeProblems}, {where: {id}});
		}
    
		if (concludeProblems) {
			logger.debug('problemModuleProgress', `user ${UserId} completed module ${ModuleId} problems`);
			await checkModuleComplete(id);
			await addPoints(UserId, 2);
		}
	} catch (err) {
		logger.error('problemModuleProgress', err);
		throw Errors.ProgressErrors.FAILED_TO_SAVE_PROBLEM_MODULE_PROGRESS;
	}
};

const getPoints = async (UserId) => {
	try {
		const pointsUser = await PointsUser.findOne({ 
			where: { UserId },
			attributes: ['points']
		});
		if (!pointsUser) {
			logger.debug('getPoints', `user ${UserId} points not created`);
			return 0;
		}
		return pointsUser.points;
	} catch (err) {
		logger.error('getPoints', err);
		throw Errors.ProgressErrors.FAILED_TO_GET_POINTS;
	}
};

const getMaterial = async (MaterialId, UserId) => {
	try {
		const materialUser = await MaterialUser.findOne({ 
			where: { UserId, MaterialId },
			attributes: ['done']
		});  
		return materialUser;
	} catch (err) {
		logger.error('getMaterial', err);
		throw Errors.ProgressErrors.FAILED_TO_GET_MATERIAL;
	}
};

const saveMaterial = async (UserId, material) => {
	try {
		await MaterialUser.create({
			done: true, 
			MaterialId: material.id,
			UserId
		}); 

		await addPoints(UserId, 1);
		if (!material.complementary) {
			logger.debug('saveMaterial', `user ${UserId} completed mandatory material ${material.id}`);
			await materialModuleProgress(material.ModuleId, UserId);
		}
	} catch (err) {
		logger.error('saveMaterial', err);
		throw Errors.ProgressErrors.FAILED_TO_SAVE_MATERIAL_PROGRESS;
	}
};

const getQuiz = async (QuizId, UserId) => {
	try {
		const quizUser = await QuizUser.findOne({ 
			where: { UserId, QuizId },
			attributes: ['done', 'attempts', 'hint']
		});  
		return quizUser;
	} catch (err) {
		logger.error('getQuiz', err);
		throw Errors.ProgressErrors.FAILED_TO_GET_QUIZ;
	}
};

const getDoneModules = async (CourseId, UserId) => {
	try {
		const doneModules = await ModuleUser.findAll({ 
			where: { 
				UserId,  
				ModuleId: {
					[Sequelize.Op.in]: Sequelize.literal(`(SELECT id FROM Modules WHERE course_id = ${CourseId})`)
				},
				concludeMaterials: true,
				concludeQuizzes: true,
				concludeProblems: true
			},
			attributes: ['id', 'ModuleId']
		});
		return doneModules;
	} catch (err) {
		logger.error('getDoneModules', err);
		throw Errors.ProgressErrors.FAILED_TO_GET_DONE_MODULES;
	}
};

const getDoneQuizzes = async (ModuleId, UserId) => {
	try {
		const doneQuizzes = await QuizUser.findAll({ 
			where: { 
				UserId,  
				QuizId: {
					[Sequelize.Op.in]: Sequelize.literal(`(SELECT id FROM Quizzes WHERE module_id = ${ModuleId})`)
				},
				done: true
			},
			attributes: ['id', 'QuizId']
		});
		return doneQuizzes;
	} catch (err) {
		logger.error('getDoneQuizzes', err);
		throw Errors.ProgressErrors.FAILED_TO_GET_DONE_QUIZZES;
	}
};

const getDoneMaterials = async (ModuleId, UserId) => {
	try {
		const doneMaterials = await MaterialUser.findAll({ 
			where: { 
				UserId,  
				MaterialId: {
					[Sequelize.Op.in]: Sequelize.literal(`(SELECT id FROM Materials WHERE module_id = ${ModuleId})`)
				},
				done: true
			},
			attributes: ['id', 'MaterialId']
		});
		return doneMaterials;
	} catch (err) {
		logger.error('getDoneMaterials', err);
		throw Errors.ProgressErrors.FAILED_TO_GET_DONE_MATERIALS;
	}
};

const getDoneProblems = async (ModuleId, UserId) => {
	try {
		const doneProblems = await ProblemUser.findAll({ 
			where: { 
				UserId,  
				ProblemId: {
					[Sequelize.Op.in]: Sequelize.literal(`(SELECT id FROM Problems WHERE module_id = ${ModuleId})`)
				},
				done: true
			},
			attributes: ['id', 'ProblemId']
		});
		return doneProblems;
	} catch (err) {
		logger.error('getDoneProblems', err);
		throw Errors.ProgressErrors.FAILED_TO_GET_DONE_PROBLEMS;
	}
};

const saveQuiz = async (QuizId, UserId, quizUser, done) => {
	try {
		let attempts;
		if (!quizUser) {
			logger.debug('saveQuiz', `creating quizUser to user ${UserId} and quiz ${QuizId}`);
			attempts = 1;
			await QuizUser.create({
				QuizId,
				UserId,
				done,
				attempts
			}); 
		} else {
			logger.debug('saveQuiz', `updating quizUser to user ${UserId} and quiz ${QuizId}`);
			attempts = quizUser.attempts + 1;
			await QuizUser.update({
				attempts,
				done
			}, { where: { UserId, QuizId }});
		}

		if (done) {
			logger.debug('saveQuiz', `user ${UserId} completed quiz ${QuizId}`);
			await addPoints(UserId, Math.max(6-attempts, 3));
			await quizModuleProgress(QuizId, UserId);
		}
	} catch (err) {
		logger.error('saveQuiz', err);
		throw Errors.ProgressErrors.FAILED_TO_SAVE_QUIZ_PROGRESS;
	}
};

const getProblem = async (ProblemId, UserId) => {
	try {
		const problemUser = await ProblemUser.findOne({ 
			where: { UserId, ProblemId },
			attributes: ['done', 'attempts', 'oracle']
		});  
		return problemUser;
	} catch (err) {
		logger.error('getProblem', err);
		throw Errors.ProgressErrors.FAILED_TO_GET_PROBLEM;
	}
};

const saveProblem = async (ProblemId, UserId, problemUser, done) => {
	try {
		let attempts;
		if (!problemUser) {
			logger.debug('saveProblem', `creating problemUser to user ${UserId} and problem ${ProblemId}`);
			attempts = 1;
			await ProblemUser.create({
				ProblemId,
				UserId,
				done,
				attempts,
				oracle: false
			}); 
		} else {
			logger.debug('saveProblem', `updating problemUser to user ${UserId} and problem ${ProblemId}`);
			attempts = problemUser.attempts + 1;
			await ProblemUser.update({
				attempts,
				done
			}, { where: { UserId, ProblemId }});
		}

		if (done) {
			logger.debug('saveProblem', `user ${UserId} completed problem ${ProblemId}`);
			await addPoints(UserId, Math.max(11-attempts, 5));
			await problemModuleProgress(ProblemId, UserId);
		}
	} catch (err) {
		logger.error('saveProblem', err);
		throw Errors.ProgressErrors.FAILED_TO_SAVE_PROBLEM_PROGRESS;
	}
};

const saveOracle = async (ProblemId, UserId, problemUser, inputOnly, correct) => {
	try {
		if (!problemUser) {
			logger.debug('saveOracle', `creating problemUser to user ${UserId} and problem ${ProblemId}`);
			await ProblemUser.create({
				ProblemId,
				UserId,
				done: false,
				attempts: 0,
				oracle: true
			}); 
			if (!inputOnly && correct) {
				logger.debug('saveOracle', `user ${UserId} used oracle to ${ProblemId} in input only mode`);
				await addPoints(UserId, 2);
			}
		} else {
			logger.debug('saveOracle', `updating problemUser to user ${UserId} and problem ${ProblemId}`);
			await ProblemUser.update({
				oracle: true
			}, { where: { UserId, ProblemId }});
		}
	} catch (err) {
		logger.error('saveOracle', err);
		throw Errors.ProgressErrors.FAILED_TO_SAVE_ORACLE;
	}
};

const saveHint = async (QuizId, UserId, quizUser) => {
	try {
		if (!quizUser) {
			logger.debug('saveHint', `creating quizUser to user ${UserId} and quiz ${QuizId}`);
			await QuizUser.create({
				QuizId,
				UserId,
				done: false,
				attempts: 1,
				hint: true
			}); 
		} else {
			logger.debug('saveHint', `updating quizUser to user ${UserId} and quiz ${QuizId}`);
			const attempts = quizUser.attempts + 1;
			await QuizUser.update({
				hint: true,
				attempts
			}, { where: { UserId, QuizId }});
		}
	} catch (err) {
		logger.error('saveHint', err);
		throw Errors.ProgressErrors.FAILED_TO_SAVE_HINT;
	}
};

const ranking = async () => {
	try{
		const users = await PointsUser.findAll({
			include: { association: 'user', where: { admin: false }},
			order: [['points', 'DESC']]
		});
		return users;
	} catch(err){
		logger.error('ranking', err);
		throw Errors.ProgressErrors.FAILED_TO_GET_RANKING;
	}
};

module.exports = {
	getPoints,
	getMaterial,
	getProblem,
	getQuiz,
	getDoneModules,
	getDoneQuizzes,
	getDoneMaterials,
	getDoneProblems,
	saveMaterial,
	saveQuiz,
	saveProblem,
	saveOracle,
	saveHint,
	ranking
};