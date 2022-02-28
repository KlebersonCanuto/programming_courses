const fs = require('fs');

const problemService = require('../../service/problemService');
const { Course, Module, Problem, User, Test } = require('../../database/models');
require('dotenv').config();

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

jest.setTimeout(60000);

describe('Test Problem', () => {  
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
			name: 'Module',
			CourseId: courseId
		});
		moduleId = module.id; 
	});

	it('Should create problem', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.data.title).toEqual('Problem');
			expect(response.data.description).toEqual('123');
			id = response.data.id;
		});

		const test_file = `tmp/${process.env.TEST_FILE}`;
		const image_file = `tmp/${process.env.TEST_IMAGE_FILE}`;

		fs.copyFileSync(process.env.TEST_FILE, test_file);
		fs.copyFileSync(process.env.TEST_IMAGE_FILE, image_file);

		await problemService.create({
			body: {
				title: 'Problem',
				description: '123', 
				tests: JSON.stringify([{input: '1\n2', output: '3', problemId: id}]),
				ModuleId: moduleId,
			},
			files: [{
				path: test_file,
				filename: test_file,
				originalname: test_file
			}, {
				path: image_file,
				filename: image_file,
				originalname: image_file
			}]
		}, res);
	});

	it('Should get by id', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.data.id).toEqual(id);
			expect(response.data.title).toEqual('Problem');
		});

		await problemService.get({
			params: {
				id
			}
		}, res);
	});

	it('Should update problem', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
		});

		const test_file = `tmp/${process.env.TEST_FILE}`;
		const image_file = `tmp/${process.env.TEST_IMAGE_FILE}`;

		fs.copyFileSync(process.env.TEST_FILE, test_file);
		fs.copyFileSync(process.env.TEST_IMAGE_FILE, image_file);

		await problemService.update({
			body: {
				title: 'Problem2',
				description: '1234', 
				tests: JSON.stringify([{input: '1\n2', output: '3', problemId: id}]),
			},
			params: {
				id
			},
			files: [{
				path: test_file,
				filename: test_file,
				originalname: test_file,
				mimetype: 'application'
			}, {
				path: image_file,
				filename: image_file,
				originalname: image_file,
				mimetype: 'image'
			}]
		}, res);
	});

	it('Should get by id without user data', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.data.id).toEqual(id);
			expect(response.data.title).toEqual('Problem2');
		});

		await problemService.getUser({
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
			expect(response.data.title).toEqual('Problem2');
			expect(response.data.done).toEqual(0);
		});

		await problemService.getUser({
			params: {
				id,
				userId
			}
		}, res);
	});

	it('Should submit problem', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
		});

		await problemService.submit({
			params: {
				id,
				userId
			},
			body: {
				answer: 'x = int(input())\ny = int(input())\nprint(x+y)'
			}
		}, res);
	});

	it('Should get by id with user progress done', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.data.title).toEqual('Problem2');
			expect(response.data.done).toEqual(1);
		});

		await problemService.getUser({
			params: {
				id,
				userId
			}
		}, res);
	});

	it('Should exec', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.output).toEqual('3\n');
		});

		await problemService.exec({
			body: {
				code: 'x = int(input())\ny = int(input())\nprint(x+y)',
				input: '1\n2'
			}
		}, res);
	});

	it('Should exec oracle', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.correct).toEqual(true);
		});

		await problemService.oracle({
			body: {
				input: '1\n2',
				inputOnly: false,
				output: '3\n'
			},
			params: {
				id,
				userId
			}
		}, res);
	});

	it('Should exec oracle incorrect', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.correct).toEqual(false);
		});

		await problemService.oracle({
			body: {
				input: '1\n2',
				inputOnly: false,
				output: '12'
			},
			params: {
				id,
				userId
			}
		}, res);
	});

	it('Should fail to exec oracle (require more input)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await problemService.oracle({
			body: {
				input: '1',
				inputOnly: false,
				output: '12'
			},
			params: {
				id,
				userId
			}
		}, res);
	});

	it('Should exec oracle inputOnly', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
			expect(response.output).toEqual('3\n');
		});

		await problemService.oracle({
			body: {
				input: '1\n2',
				inputOnly: true
			},
			params: {
				id,
				userId
			}
		}, res);
	});

	it('Should fail to exec oracle inputOnly (require more input)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await problemService.oracle({
			body: {
				input: '1',
				inputOnly: true
			},
			params: {
				id,
				userId
			}
		}, res);
	});

	it('Should fail to get problem', async () => {
		const spy = jest.spyOn(Problem, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await problemService.get({
			params: {
				id
			}
		}, res);
		spy.mockRestore();
	});

	it('Should fail to get problem with user data', async () => {
		const spy = jest.spyOn(Problem, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await problemService.getUser({
			params: {
				id
			}
		}, res);
		spy.mockRestore();
	});

	it('Should fail to create problem (invalid title)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await problemService.create({
			body: {
				title: '',
				description: '123', 
				tests: JSON.stringify([{input: '1\n2', output: '3', problemId: id}]),
				ModuleId: moduleId,
			},
		}, res);
	});
    
	it('Should fail to create problem (invalid description)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await problemService.create({
			body: {
				title: 'Problem',
				description: '', 
				tests: JSON.stringify([{input: '1\n2', output: '3', problemId: id}]),
				ModuleId: moduleId,
			},
		}, res);
	});

	it('Should fail to create problem (invalid files)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await problemService.create({
			body: {
				title: 'Problem',
				description: '123', 
				tests: JSON.stringify([{input: '1\n2', output: '3', problemId: id}]),
				ModuleId: moduleId,
			},
		}, res);
	});

	it('Should fail to create problem (invalid tests)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await problemService.create({
			body: {
				title: 'Problem',
				description: '123', 
				tests: JSON.stringify([]),
				ModuleId: moduleId,
			},
			files: [
				{}
			]
		}, res);
	});

	it('Should fail to create problem (invalid moduleId)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await problemService.create({
			body: {
				title: 'Problem',
				description: '123', 
				tests: JSON.stringify([{input: '1\n2', output: '3', problemId: id}]),
			},
		}, res);
	});

	it('Should fail to update problem (invalid title)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await problemService.update({
			body: {
				title: '',
				description: '1234', 
				tests: JSON.stringify([{input: '1\n2', output: '3', problemId: id}]),
			},
			params: {
				id
			},
			files: []
		}, res);
	});

    
	it('Should fail to update problem (invalid description)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await problemService.update({
			body: {
				title: 'Problem2',
				description: '', 
				tests: JSON.stringify([{input: '1\n2', output: '3', problemId: id}]),
			},
			params: {
				id
			},
			files: []
		}, res);
	});

    
	it('Should fail to update problem (invalid answers)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await problemService.update({
			body: {
				title: 'Problem2',
				description: '123', 
				tests: JSON.stringify([]),
			},
			params: {
				id
			},
			files: []
		}, res);
	});

	it('Should fail to update tests', async () => {
		const spy = jest.spyOn(Problem, 'update').mockImplementation(() => { throw new Error('error'); });
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		const test_file = `tmp/${process.env.TEST_FILE}`;
		const image_file = `tmp/${process.env.TEST_IMAGE_FILE}`;

		fs.copyFileSync(process.env.TEST_FILE, test_file);
		fs.copyFileSync(process.env.TEST_IMAGE_FILE, image_file);

		await problemService.update({
			body: {
				title: 'Problem2',
				description: '12345', 
				tests: JSON.stringify([{input: '1\n2', output: '3', problemId: id}]),
			},
			params: {
				id
			},
			files: []
		}, res);

		spy.mockRestore();
	});

	it('Should fail to update tests and delete tests', async () => {
		const spy = jest.spyOn(Problem, 'update').mockImplementation(() => { throw new Error('error'); });
		const spy2 = jest.spyOn(Test, 'destroy').mockImplementation(() => { throw new Error('error'); });
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		const test_file = `tmp/${process.env.TEST_FILE}`;
		const image_file = `tmp/${process.env.TEST_IMAGE_FILE}`;

		fs.copyFileSync(process.env.TEST_FILE, test_file);
		fs.copyFileSync(process.env.TEST_IMAGE_FILE, image_file);

		await problemService.update({
			body: {
				title: 'Problem2',
				description: '12345', 
				tests: JSON.stringify([{input: '1\n2', output: '3', problemId: id}]),
			},
			params: {
				id
			},
			files: []
		}, res);

		spy.mockRestore();
		spy2.mockRestore();
	});

	it('Should fail to create problem tests', async () => {
		const spy = jest.spyOn(Test, 'bulkCreate').mockImplementation(() => { throw new Error('error'); });
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		const test_file = `tmp/${process.env.TEST_FILE}`;
		const image_file = `tmp/${process.env.TEST_IMAGE_FILE}`;

		fs.copyFileSync(process.env.TEST_FILE, test_file);
		fs.copyFileSync(process.env.TEST_IMAGE_FILE, image_file);

		await problemService.create({
			body: {
				title: 'Problem',
				description: '123', 
				tests: JSON.stringify([{input: '1\n2', output: '3', problemId: id}]),
				ModuleId: moduleId,
			},
			files: [{
				path: test_file,
				filename: test_file,
				originalname: test_file
			}]
		}, res);
		spy.mockRestore();
	});

	it('Should fail to exec', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await problemService.exec({
			body: {
				code: 'x = int(input())\ny = int(input())\nprint(x+y)',
				input: '1'
			}
		}, res);
	});

	it('Should fail to exec oracle (no inputOnly attribute)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await problemService.oracle({
			body: {
				input: '1\n2'
			},
			params: {}
		}, res);
	});

	it('Should fail to exec oracle (no input)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await problemService.oracle({
			body: {
				inputOnly: true,
				input: ''
			},
			params: {}
		}, res);
	});

	it('Should fail to exec oracle (no inputOnly without output)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await problemService.oracle({
			body: {
				inputOnly: false,
				input: '1\n2'
			},
			params: {}
		}, res);
	});

	it('Should fail to remove problem', async () => {
		const spy = jest.spyOn(Problem, 'destroy').mockImplementation(() => { throw new Error('error'); });
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await problemService.remove({
			params: {
				id
			}
		}, res);
		spy.mockRestore();
	});

	it('Should fail to submit problem', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await problemService.submit({
			params: {
				id,
				userId
			},
			body: {

			}
		}, res);
	});

	it('Should fail to submit problem (invalid answer)', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await problemService.submit({
			params: {
				id,
				userId
			},
			body: {
				answer: 'x = int(input())\ny = int(input())\nz = int(input())\nprint(x+y)'
			}
		}, res);
	});

	it('Should remove problem', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
		});

		await problemService.remove({
			params: {
				id
			}
		}, res);
	});
});