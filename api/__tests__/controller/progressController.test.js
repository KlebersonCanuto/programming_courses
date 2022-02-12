const progressController = require('../../controller/progressController');
const { Course, Module, Quiz, Problem, Material, User, MaterialUser, PointsUser, ProblemUser, QuizUser, ModuleUser, CourseUser } = require('../../database/models');

describe('Test Progress', () => {  
	let moduleId;
	let quizId;
	let problemId;
	let userId;
	let materialId;
	let moduleId2;
	let moduleId3;
	let quizId2;
	let materialId2;
	let problemId2;
	let courseId;

	beforeAll(async () => {
		await Course.destroy({ where: {} });
		await User.destroy({ where: {} });

		const course = await Course.create({
			name: 'Course',
		});
		courseId = course.id;

		const module = await Module.create({
			name: 'Module',
			CourseId: courseId,
		});
		moduleId = module.id;

		const module2 = await Module.create({
			name: 'Module',
			CourseId: courseId,
		});
		moduleId2 = module2.id;

		
		const module3 = await Module.create({
			name: 'Module',
			CourseId: courseId,
		});
		moduleId3 = module3.id;

		const material = await Material.create({
			title: 'Material',
			content: '123', 
			complementary: false,
			number: 0,
			video_link: '123',
			ModuleId: moduleId,
		});
		materialId = material.id;

		const material2 = await Material.create({
			title: 'Material',
			content: '123', 
			complementary: false,
			number: 0,
			video_link: '123',
			ModuleId: moduleId3,
		});
		materialId2 = material2.id;

		const quiz = await Quiz.create({
			title: 'Quiz',
			question: '123', 
			hint: '123', 
			answers: ['123', '1', '2', '3'],
			number: 0,
			ModuleId: moduleId,
		});
		quizId = quiz.id;

		const quiz2 = await Quiz.create({
			title: 'Quiz',
			question: '123', 
			hint: '123', 
			answers: ['123', '1', '2', '3'],
			number: 0,
			ModuleId: moduleId2,
		});
		quizId2 = quiz2.id;

		const problem = await Problem.create({
			title: 'Problem',
			description: '123', 
			ModuleId: moduleId,
			file_id: '123',
		});
		problemId = problem.id;

		const problem2 = await Problem.create({
			title: 'Problem',
			description: '123', 
			ModuleId: moduleId2,
			file_id: '123',
		});
		problemId2 = problem2.id;

		const user = await User.create({
			username: 'User',
			email: '123',
			password: '123',
		});
		userId = user.id;
	});

	it('Should get no user from ranking', async () => {
		const users = await progressController.ranking();
		expect(users.length).toEqual(0);
	});

	it('Should get 0 points', async () => {
		const points = await progressController.getPoints(userId);
		expect(points).toEqual(0);
	}); 

	it('Should get no material', async () => {
		const materialUser = await progressController.getMaterial(materialId, userId);
		expect(materialUser).toEqual(null);
	}); 

	it('Should get no problem', async () => {
		const problemUser = await progressController.getProblem(problemId, userId);
		expect(problemUser).toEqual(null);
	});

	it('Should get no quiz', async () => {
		const quizUser = await progressController.getQuiz(quizId, userId);
		expect(quizUser).toEqual(null);
	});

	it('Should get no modulelUser', async () => {
		const moduleUser = await progressController.getDoneModules(courseId, userId);
		expect(moduleUser).toEqual([]);
	}); 

	it('Should get no quizUser', async () => {
		const quizUser = await progressController.getDoneQuizzes(moduleId, userId);
		expect(quizUser).toEqual([]);
	}); 

	it('Should get no problemUser', async () => {
		const problemUser = await progressController.getDoneProblems(moduleId, userId);
		expect(problemUser).toEqual([]);
	}); 

	it('Should get no materialUser', async () => {
		const materialUser = await progressController.getDoneMaterials(moduleId, userId);
		expect(materialUser).toEqual([]);
	}); 

	it('Should save oracle', async () => {
		await progressController.saveOracle(problemId, userId, false, false, true);
		const problemsUser = await progressController.getDoneProblems(moduleId, userId);
		expect(problemsUser.length).toEqual(0);
		const problemUser = await progressController.getProblem(problemId, userId);
		expect(problemUser.oracle).toEqual(true);
	}); 

	it('Should save oracle with existent problemUser', async () => {
		await progressController.saveOracle(problemId, userId, true, false, true);
		const problemsUser = await progressController.getDoneProblems(moduleId, userId);
		expect(problemsUser.length).toEqual(0);
		const problemUser = await progressController.getProblem(problemId, userId);
		expect(problemUser.oracle).toEqual(true);
	}); 

	it('Should save hint', async () => {
		await progressController.saveHint(quizId, userId, null);
		const quizzesUser = await progressController.getDoneQuizzes(moduleId, userId);
		expect(quizzesUser.length).toEqual(0);
		const quizUser = await progressController.getQuiz(quizId, userId);
		expect(quizUser.attempts).toEqual(1);
		expect(quizUser.hint).toEqual(true);
	}); 

	it('Should save hint with existent quizUser', async () => {
		await progressController.saveHint(quizId, userId, {attempts: 1});
		const quizzesUser = await progressController.getDoneQuizzes(moduleId, userId);
		expect(quizzesUser.length).toEqual(0);
		const quizUser = await progressController.getQuiz(quizId, userId);
		expect(quizUser.attempts).toEqual(2);
		expect(quizUser.hint).toEqual(true);
	}); 

	it('Should save problem', async () => {
		await progressController.saveProblem(problemId, userId, {attempts: 0}, true);
		const problemsUser = await progressController.getDoneProblems(moduleId, userId);
		expect(problemsUser.length).toEqual(1);
	}); 

	it('Should get 14 points', async () => {
		const points = await progressController.getPoints(userId);
		expect(points).toEqual(14);
	}); 

	it('Should save quiz', async () => {
		await progressController.saveQuiz(quizId, userId, {attempts: 2}, true);
		const quizzesUser = await progressController.getDoneQuizzes(moduleId, userId);
		expect(quizzesUser.length).toEqual(1);
	}); 

	it('Should get 19 points', async () => {
		const points = await progressController.getPoints(userId);
		expect(points).toEqual(19);
	}); 

	it('Should save material', async () => {
		await progressController.saveMaterial(userId, {id: materialId, complementary: false, ModuleId: moduleId});
		const materialsUser = await progressController.getDoneMaterials(moduleId, userId);
		expect(materialsUser.length).toEqual(1);
		const modulesUser = await progressController.getDoneModules(courseId, userId);
		expect(modulesUser.length).toEqual(1);
	}); 

	it('Should get 24 points', async () => {
		const points = await progressController.getPoints(userId);
		expect(points).toEqual(24);
	}); 

	it('Should save second material', async () => {
		await progressController.saveMaterial(userId, {id: materialId2, complementary: false, ModuleId: moduleId3});
		const materialsUser = await progressController.getDoneMaterials(moduleId3, userId);
		expect(materialsUser.length).toEqual(1);
		const modulesUser = await progressController.getDoneModules(courseId, userId);
		expect(modulesUser.length).toEqual(2);
	}); 

	it('Should get 29 points', async () => {
		const points = await progressController.getPoints(userId);
		expect(points).toEqual(29);
	}); 

	it('Should save second quiz', async () => {
		await progressController.saveQuiz(quizId2, userId, null, true);
		const quizzesUser = await progressController.getDoneQuizzes(moduleId2, userId);
		expect(quizzesUser.length).toEqual(1);
	}); 

	it('Should get 36 points', async () => {
		const points = await progressController.getPoints(userId);
		expect(points).toEqual(36);
	});	

	it('Should save second problem', async () => {
		await progressController.saveProblem(problemId2, userId, null, true);
		const problemsUser = await progressController.getDoneProblems(moduleId2, userId);
		expect(problemsUser.length).toEqual(1);
		const modulesUser = await progressController.getDoneModules(courseId, userId);
		expect(modulesUser.length).toEqual(3);
	}); 

	it('Should get 61 points', async () => {
		const points = await progressController.getPoints(userId);
		expect(points).toEqual(61);
	}); 

	it('Should fail get ranking', async () => {
		const spy = jest.spyOn(PointsUser, 'findAll').mockImplementation(() => { throw new Error('error'); });
		await expect(progressController.ranking()).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail get points', async () => {
		const spy = jest.spyOn(PointsUser, 'findOne').mockImplementation(() => { throw new Error('error'); });
		await expect(progressController.getPoints(userId)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail get material', async () => {
		const spy = jest.spyOn(MaterialUser, 'findOne').mockImplementation(() => { throw new Error('error'); });
		await expect(progressController.getMaterial(materialId, userId)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail get quiz', async () => {
		const spy = jest.spyOn(QuizUser, 'findOne').mockImplementation(() => { throw new Error('error'); });
		await expect(progressController.getQuiz(quizId, userId)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail get problem', async () => {
		const spy = jest.spyOn(ProblemUser, 'findOne').mockImplementation(() => { throw new Error('error'); });
		await expect(progressController.getProblem(problemId, userId)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail get done modules', async () => {
		const spy = jest.spyOn(ModuleUser, 'findAll').mockImplementation(() => { throw new Error('error'); });
		await expect(progressController.getDoneModules(courseId, userId)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail get done materials', async () => {
		const spy = jest.spyOn(MaterialUser, 'findAll').mockImplementation(() => { throw new Error('error'); });
		await expect(progressController.getDoneMaterials(moduleId, userId)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail get done quizzes', async () => {
		const spy = jest.spyOn(QuizUser, 'findAll').mockImplementation(() => { throw new Error('error'); });
		await expect(progressController.getDoneQuizzes(moduleId, userId)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail get done problems', async () => {
		const spy = jest.spyOn(ProblemUser, 'findAll').mockImplementation(() => { throw new Error('error'); });
		await expect(progressController.getDoneProblems(moduleId, userId)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to save oracle', async () => {
		const spy = jest.spyOn(ProblemUser, 'create').mockImplementation(() => { throw new Error('error'); });
		await expect(progressController.saveOracle(problemId, userId, false, false, true)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to save hint', async () => {
		const spy = jest.spyOn(QuizUser, 'create').mockImplementation(() => { throw new Error('error'); });
		await expect(progressController.saveHint(problemId, userId, null)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to save problem', async () => {
		const spy = jest.spyOn(ProblemUser, 'create').mockImplementation(() => { throw new Error('error'); });
		await expect(progressController.saveProblem(problemId, userId, null, true)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to save quiz', async () => {
		const spy = jest.spyOn(QuizUser, 'create').mockImplementation(() => { throw new Error('error'); });
		await expect(progressController.saveQuiz(quizId, userId, null, true)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to save material', async () => {
		const spy = jest.spyOn(MaterialUser, 'create').mockImplementation(() => { throw new Error('error'); });
		await expect(progressController.saveMaterial(userId, {})).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to check course complete', async () => {
		const spy = jest.spyOn(CourseUser, 'findOne').mockImplementation(() => { throw new Error('error'); });
		const material = await Material.create({
			title: 'Material 2',
			content: '123', 
			complementary: false,
			number: 0,
			video_link: '123',
			ModuleId: moduleId,
		});
		id = material.id;
		await expect(progressController.saveMaterial(userId, {id, complementary: false, ModuleId: moduleId})).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to check quiz module complete', async () => {
		const spy = jest.spyOn(ModuleUser, 'findOne').mockImplementation(() => { throw new Error('error'); });
		const quiz = await Quiz.create({
			title: 'Quiz',
			question: '123', 
			hint: '123', 
			answers: ['123', '1', '2', '3'],
			number: 0,
			ModuleId: moduleId,
		});
		await expect(progressController.saveQuiz(quiz.id, userId, null, true)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to check problem module complete', async () => {
		const spy = jest.spyOn(ModuleUser, 'findOne').mockImplementation(() => { throw new Error('error'); });
		const problem = await Problem.create({
			title: 'Problem',
			description: '123', 
			ModuleId: moduleId,
			file_id: '123',
		});
		await expect(progressController.saveProblem(problem.id, userId, null, true)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to add points', async () => {
		const spy = jest.spyOn(PointsUser, 'update').mockImplementation(() => { throw new Error('error'); });
		const material = await Material.create({
			title: 'Material 2',
			content: '123', 
			complementary: false,
			number: 0,
			video_link: '123',
			ModuleId: moduleId,
		});
		id = material.id;
		await expect(progressController.saveMaterial(userId, {id})).rejects.toThrow();
		spy.mockRestore();
	});
});