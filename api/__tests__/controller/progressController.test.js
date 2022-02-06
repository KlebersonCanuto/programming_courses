const progressController = require('../../controller/progressController');
const { Course, Module, Quiz, Problem, Material, User, MaterialUser, PointsUser, ProblemUser, QuizUser, ModuleUser, CourseUser } = require('../../database/models');

describe('Test Progress', () => {  
	let moduleId;
	let quizId;
	let problemId;
	let userId;
	let materialId;
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

		const material = await Material.create({
			title: 'Material',
			content: '123', 
			complementary: true,
			number: 0,
			video_link: '123',
			ModuleId: moduleId,
		});
		materialId = material.id;

		const quiz = await Quiz.create({
			title: 'Quiz',
			question: '123', 
			hint: '123', 
			answers: ["123", "1", "2", "3"],
			number: 0,
			ModuleId: moduleId,
		});
		quizId = quiz.id;

		const problem = await Problem.create({
			title: 'Problem',
			description: '123', 
			ModuleId: moduleId,
			file_id: '123',
		});
		problemId = problem.id;

		console.log("problem")
		console.log(problem)

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
});