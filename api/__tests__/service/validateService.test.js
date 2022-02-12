const validateService = require('../../service/validateService');
const { Course, Module, Material, Problem, Quiz } = require('../../database/models');

generateResponse = (fn) => {
	const response = {
		code: 0,
		status: (value) => { 
			response.code = value;
			return response; 
		},
		send: fn,
	};
	return response;
};

describe('Test Validate', () => {  
	let courseLockedId;
	let courseUnlockedId;
	let moduleId;

	beforeAll(async () => {-
	await Course.destroy({ where: {} });

	const course = await Course.create({
		name: 'Course',
		locked: false
	});
	courseUnlockedId = course.id;
		
	const courseLocked = await Course.create({
		name: 'Course locked',
		locked: true
	});
	courseLockedId = courseLocked.id;
	});
    
	it('Should check course locked', async () => {
		await validateService.checkCourseLocked({
			params: {
				id: courseLockedId,
			},
			originalUrl: 'courses'
		}, null, () => {});
	});

	it('Should fail to check course locked', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await validateService.checkCourseLocked({
			params: {
				id: courseUnlockedId,
			},
			originalUrl: 'courses'
		}, res, () => {});
	});

	it('Should check course unlocked', async () => {
		await validateService.checkCourseUnlocked({
			params: {
				id: courseUnlockedId,
			},
			originalUrl: 'courses'
		}, null, () => {});
	});

	it('Should fail to check course unlocked', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await validateService.checkCourseUnlocked({
			params: {
				id: courseLockedId,
			},
			originalUrl: 'courses'
		}, res, () => {});
	});

	it('Should check course unlocked (module)', async () => {
		const module = await Module.create({
			CourseId: courseUnlockedId,
			name: 'Module'
		});
		moduleId = module.id;

		await validateService.checkCourseUnlocked({
			params: {
				id: moduleId,
			},
			originalUrl: 'modules'
		}, null, () => {});
	});

	it('Should check course unlocked (material)', async () => {
		const material = await Material.create({
			title: 'Material',
			content: '123', 
			complementary: false,
			number: 0,
			video_link: '',
			ModuleId: moduleId,
		});
		const materialId = material.id;

		await validateService.checkCourseUnlocked({
			params: {
				id: materialId,
			},
			originalUrl: 'materials'
		}, null, () => {});
	});

	it('Should check course unlocked (quiz)', async () => {
		const quiz = await Quiz.create({
			title: 'Quiz',
			question: '123', 
			hint: '123', 
			answers: ['123', '1', '2', '3'],
			number: 0,
			ModuleId: moduleId,
		});
		const quizId = quiz.id;

		await validateService.checkCourseUnlocked({
			params: {
				id: quizId,
			},
			originalUrl: 'quizzes'
		}, null, () => {});
	});

	it('Should check course unlocked (problem)', async () => {
		const problem = await Problem.create({
			title: 'Problem',
			description: '123', 
			ModuleId: moduleId,
			file_id: '123'
		});
		const problemId = problem.id;

		await validateService.checkCourseUnlocked({
			params: {
				id: problemId,
			},
			originalUrl: 'problems'
		}, null, () => {});
	});

	it('Should check course unlocked (module body)', async () => {
		await validateService.checkCourseUnlocked({
			body: {
				CourseId: courseUnlockedId,
			},
			params: {},
			originalUrl: 'modules'
		}, null, () => {});
	});

	it('Should check course unlocked (material body)', async () => {
		await validateService.checkCourseUnlocked({
			params: {},
			body: {
				ModuleId: moduleId,
			},
			originalUrl: 'materials'
		}, null, () => {});
	});

	it('Should check course unlocked (quiz body)', async () => {
		await validateService.checkCourseUnlocked({
			params: {},
			body: {
				ModuleId: moduleId,
			},
			originalUrl: 'quizzes'
		}, null, () => {});
	});

	it('Should check course unlocked (problem body)', async () => {
		await validateService.checkCourseUnlocked({
			params: {},
			body: {
				ModuleId: moduleId,
			},
			originalUrl: 'problems'
		}, null, () => {});
	});

	it('Should fail to check course locked (course not exists)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await validateService.checkCourseLocked({
			params: {
				id: courseLockedId*2,
			},
			originalUrl: 'courses'
		}, res, () => {});
	});

	it('Should fail to check course unlocked (course not exists)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await validateService.checkCourseUnlocked({
			params: {
				id: courseLockedId*2,
			},
			originalUrl: 'courses'
		}, res, () => {});
	});
});