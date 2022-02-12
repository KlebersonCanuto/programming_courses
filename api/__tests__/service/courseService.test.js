const courseService = require('../../service/courseService');
const { Course, Module } = require('../../database/models');

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

describe('Test Course', () => {  
	let id;

	beforeAll(async () => {-
		await Course.destroy({ where: {} });
	});
    
	it('Should get no course', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.data.length).toEqual(0);
		});

		await courseService.getAll({
			params: {

			}
		}, res);
	});

	it('Should get no course with user data', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.data.length).toEqual(0);
		});

		await courseService.getAll({
			params: {
				userId: 1
			}
		}, res);
	});

	it('Should get no course to admin', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.data.length).toEqual(0);
		});

		await courseService.getAllAdmin(null, res);
	});

	it('Should create course', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.data.name).toEqual('Course');
			id = response.data.id;
		});

		await courseService.create({
			body: {
				name: 'Course',
			}
		}, res);
	});

	it('Should get course', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.data.name).toEqual('Course');
		});

		await courseService.get({
			params: {
				id: id
			}
		}, res);
	});

	it('Should update course', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
		});

		await courseService.update({
			params: {
				id: id
			},
			body: {
				name: 'Course2',
			}
		}, res);
	});

	it('Should get course updated', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.data.name).toEqual('Course2');
		});

		await courseService.get({
			params: {
				id: id
			}
		}, res);
	});

	it('Should lock course', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
		});

		await courseService.lock({
			params: {
				id: id
			}
		}, res);
	});

	it('Should get course updated with user', async () => {
		await Module.create({
			name: 'Module',
			CourseId: id,
		});
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.data.name).toEqual('Course2');
		});

		await courseService.getUser({
			params: {
				id: id,
				userId: 1
			}
		}, res);
	});

	it('Should fail to get all', async () => {
		const spy = jest.spyOn(Course, 'findAll').mockImplementation(() => { throw new Error('error'); });
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await courseService.getAll({
			params: {
				userId: 1
			}
		}, res);
		spy.mockRestore();
	});


	it('Should fail to get all admin', async () => {
		const spy = jest.spyOn(Course, 'findAll').mockImplementation(() => { throw new Error('error'); });
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await courseService.getAllAdmin({
			params: {
				id: id
			}
		}, res);
		spy.mockRestore();
	});

	it('Should fail to get by id', async () => {
		const spy = jest.spyOn(Course, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await courseService.get({
			params: {
				id: id
			}
		}, res);
		spy.mockRestore();
	});
    
	it('Should fail to get course with user', async () => {
		const spy = jest.spyOn(Course, 'findOne').mockImplementation(() => { throw new Error('error'); });
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await courseService.getUser({
			params: {
				id: id,
				userId: 1
			}
		}, res);
		spy.mockRestore();
	});

	it('Should fail to create course', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await courseService.create({
			body: {
				name: '',
			}
		}, res);
	});

	it('Should fail to update course', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await courseService.update({
			params: {
				id: id
			},
			body: {
				name: '',
			}
		}, res);
	});

	it('Should fail to lock course', async () => {
		const spy = jest.spyOn(Course, 'update').mockImplementation(() => { throw new Error('error'); });
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await courseService.lock({
			params: {
				id: id
			}
		}, res);
		spy.mockRestore();
	});

	it('Should fail to remove course', async () => {
		const spy = jest.spyOn(Course, 'destroy').mockImplementation(() => { throw new Error('error'); });
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await courseService.remove({
			params: {
				id: id
			}
		}, res);
		spy.mockRestore();
	});

	it('Should remove course', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
		});

		await courseService.remove({
			params: {
				id: id
			}
		}, res);
	});
});