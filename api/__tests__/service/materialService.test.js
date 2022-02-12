const materialService = require('../../service/materialService');
const { Course, Module, Material, User } = require('../../database/models');

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

describe('Test Material', () => {  
	let moduleId;
	let userId;
	let id;

	beforeAll(async () => {
		await Course.destroy({ where: {} });
		await User.destroy({ where: {} });
		
		const course = await Course.create({
			name: 'Course',
		});
		const courseId = course.id;

		const module = await Module.create({
			name: 'Course',
			CourseId: courseId
		});
		moduleId = module.id; 
	});

	it('Should create material', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.data.title).toEqual('Material');
			expect(response.data.content).toEqual('Material');
			id = response.data.id;
		});

		await materialService.create({
			body: {
				title: 'Material',
				content: 'Material',
				complementary: false,
				video_link: '',
				ModuleId: moduleId
			}
		}, res);
	});

	it('Should get by id', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.data.id).toEqual(id);
			expect(response.data.title).toEqual('Material');
		});

		await materialService.get({
			params: {
				id
			}
		}, res);
	});

	it('Should update material', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
		});

		await materialService.update({
			body: {
				title: 'Material2',
				content: 'Material2',
				complementary: false,
				video_link: '',
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
			expect(response.data.title).toEqual('Material2');
		});

		await materialService.getUser({
			params: {
				id
			}
		}, res);
	});

	it('Should get by id with user progress', async () => {
		const user = await User.create({
			username: 'User',
			password: 'User',
			email: 'email@email.com',
		});
		userId = user.id;

		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.data.title).toEqual('Material2');
			expect(response.data.done).toEqual(0);
		});

		await materialService.getUser({
			params: {
				id,
				userId
			}
		}, res);
	});

	it('Should done material', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
		});

		await materialService.done({
			params: {
				id,
				userId
			}
		}, res);
	});

	it('Should get by id with user progress done', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.data.title).toEqual('Material2');
			expect(response.data.done).toEqual(1);
		});

		await materialService.getUser({
			params: {
				id,
				userId
			}
		}, res);
	});

	it('Should fail to get material', async () => {
		const spy = jest.spyOn(Material, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await materialService.get({
			params: {
				id
			}
		}, res);
		spy.mockRestore();
	});

	it('Should fail to get material with user data', async () => {
		const spy = jest.spyOn(Material, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await materialService.getUser({
			params: {
				id
			}
		}, res);
		spy.mockRestore();
	});

	it('Should fail to create material (invalid title)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await materialService.create({
			body: {
				title: '',
				content: 'Material',
				complementary: false,
				video_link: '',
				ModuleId: moduleId
			}
		}, res);
	});
    
	it('Should fail to create material (invalid content)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await materialService.create({
			body: {
				title: 'Material',
				content: '',
				complementary: false,
				video_link: '',
				ModuleId: moduleId
			}
		}, res);
	});

	it('Should fail to create material (invalid complementary)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await materialService.create({
			body: {
				title: 'Material',
				content: 'Material',
				video_link: '',
				ModuleId: moduleId
			}
		}, res);
	});

	it('Should fail to create material (invalid link)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await materialService.create({
			body: {
				title: 'Material',
				content: 'Material',
				complementary: false,
				ModuleId: moduleId
			}
		}, res);
	});

	it('Should fail to create material (invalid moduleId)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await materialService.create({
			body: {
				title: 'Material',
				content: 'Material',
				complementary: false,
				video_link: '',
			}
		}, res);
	});

	it('Should fail to update material (invalid title)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await materialService.update({
			body: {
				title: '',
				content: 'Material',
				complementary: false,
				video_link: '',
			},
			params: {
				id
			}
		}, res);
	});

    
	it('Should fail to update material (invalid content)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await materialService.update({
			body: {
				title: 'Material',
				content: '',
				complementary: false,
				video_link: '',
			},
			params: {
				id
			}
		}, res);
	});

    
	it('Should fail to update material (invalid complementary)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await materialService.update({
			body: {
				title: 'Material',
				content: 'Material',
				video_link: '',
			},
			params: {
				id
			}
		}, res);
	});

    
	it('Should fail to update material (invalid link)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await materialService.update({
			body: {
				title: 'Material',
				content: 'Material',
				complementary: false,
			},
			params: {
				id
			}
		}, res);
	});

	it('Should fail to remove material', async () => {
		const spy = jest.spyOn(Material, 'destroy').mockImplementation(() => { throw new Error('error'); });
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await materialService.remove({
			params: {
				id
			}
		}, res);
		spy.mockRestore();
	});

	it('Should fail to done material', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await materialService.done({
			params: {
				id,
				userId: userId*2
			}
		}, res);
	});

	it('Should remove material', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
		});

		await materialService.remove({
			params: {
				id
			}
		}, res);
	});
});