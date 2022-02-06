const progressController = require('../controller/progressController');
const { Course, Module, Quiz, Problem, Material, User, PointsUser } = require('../database/models');

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

	it('Should fail get ranking', async () => {
		const spy = jest.spyOn(PointsUser, 'findAll').mockImplementation(() => { throw new Error('error'); });
		await expect(progressController.ranking()).rejects.toThrow();
		spy.mockRestore();
	});
});