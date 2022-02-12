const moduleService = require('../../service/moduleService');
const { Course, Module, Quiz, Problem, Material, User } = require('../../database/models');

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

describe('Test Module', () => {  
	let courseId;
	let userId;
	let id;

	beforeAll(async () => {
		await Course.destroy({ where: {} });
		await User.destroy({ where: {} });
		
		const course = await Course.create({
			name: 'Course',
		});
		courseId = course.id;
	});

	it('Should create module', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.data.name).toEqual('Module');
			id = response.data.id;
		});

		await moduleService.create({
			body: {
				name: 'Module',
				CourseId: courseId
			}
		}, res);
	});

	it('Should get by id', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.data.id).toEqual(id);
			expect(response.data.name).toEqual('Module');
		});

		await moduleService.get({
			params: {
				id
			}
		}, res);
	});

	it('Should update module', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
		});

		await moduleService.update({
			body: {
				name: 'Module2'
			},
			params: {
				id
			}
		}, res);
	});

	it('Should get by id without user data', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.data.id).toEqual(id);
			expect(response.data.name).toEqual('Module2');
		});

		await moduleService.getUser({
			params: {
				id
			}
		}, res);
	});

	it('Should get by id with progress (nothing registered)', async () => {
		const user = await User.create({
			username: 'User',
			password: 'User',
			email: 'email@email.com',
		});
		userId = user.id;

		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.data.name).toEqual('Module2');
			expect(response.data.progressMaterials).toEqual(1);
			expect(response.data.progressProblems).toEqual(1);
			expect(response.data.progressQuizzes).toEqual(1);
		});

		await moduleService.getUser({
			params: {
				id,
				userId
			}
		}, res);
	});

	it('Should get by id with valid user data', async () => {
		const material = await Material.create({
			title: 'Material',
			content: '123', 
			complementary: false,
			number: 0,
			video_link: '',
			ModuleId: id,
		});
		materialId = material.id;

		const problem = await Problem.create({
			title: 'Problem',
			description: '123', 
			ModuleId: id,
			file_id: '123'
		});
		problemId = problem.id;

		const quiz = await Quiz.create({
			title: 'Quiz',
			question: '123', 
			hint: '123', 
			answers: ['123', '1', '2', '3'],
			number: 0,
			ModuleId: id,
		});
		quizId = quiz.id;
       

		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.data.name).toEqual('Module2');
			expect(response.data.progressMaterials).toEqual(0);
			expect(response.data.progressProblems).toEqual(0);
			expect(response.data.progressQuizzes).toEqual(0);
		});

		await moduleService.getUser({
			params: {
				id,
				userId: userId
			}
		}, res);
	});

	it('Should fail to get module', async () => {
		const spy = jest.spyOn(Module, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await moduleService.get({
			params: {
				id
			}
		}, res);
		spy.mockRestore();
	});

	it('Should fail to get module with user data', async () => {
		const spy = jest.spyOn(Module, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await moduleService.getUser({
			params: {
				id
			}
		}, res);
		spy.mockRestore();
	});

	it('Should fail to create module (invalid course)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await moduleService.create({
			body: {
				name: 'Module'
			}
		}, res);
	});
    
	it('Should fail to create module (invalid name)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await moduleService.create({
			body: {
				CourseId: courseId
			}
		}, res);
	});

	it('Should fail to update module (invalid name)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await moduleService.update({
			body: {
			},
			params: {
				id
			}
		}, res);
	});

	it('Should fail to remove module', async () => {
		const spy = jest.spyOn(Module, 'destroy').mockImplementation(() => { throw new Error('error'); });
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await moduleService.remove({
			params: {
				id
			}
		}, res);
		spy.mockRestore();
	});

	it('Should remove module', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
		});

		await moduleService.remove({
			params: {
				id
			}
		}, res);
	});
});