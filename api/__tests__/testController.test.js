const testController = require('../controller/testController');
const { Course, Module, Problem, Test } = require('../database/models');

describe('Test Tests', () => {  
	let problemId;
	let ids;

	beforeAll(async () => {
		await Course.destroy({ where: {} });
		const course = await Course.create({
			name: 'Course',
		});
		const courseId = course.id;
		const module = await Module.create({
			name: 'Module',
			CourseId: courseId,
		});
		const moduleId = module.id;
		const problem = await Problem.create({
			title: 'Problem',
			description: '123',
			file_id: '123',
			image_link: '',
			ModuleId: moduleId,
		});
		problemId = problem.id;
	});

	it('Should create many tests', async () => {
		const tests = await testController.createMany([{
			input: '1',
			output: '2',
			example: true,
			ProblemId: problemId,
		}, {
			input: '2',
			output: '4',
			example: false,
			ProblemId: problemId,
		}]);
		console.log()
		ids = tests.map(test => test.id);
		expect(tests.length).toEqual(2);
	});

	it('Should delete tests', async () => {
		const qtd = await testController.deleteMany(ids);
		expect(qtd).toEqual(2);
	});

	it('Should create a test', async () => {
		const tests = await testController.createMany([{
			input: '3',
			output: '6',
			example: false,
			ProblemId: problemId,
		}]);
		ids = tests.map(test => test.id);
		expect(tests.length).toEqual(1);
	});

	it('Should delete test', async () => {
		const qtd = await testController.remove(ids[0]);
		expect(qtd).toEqual(1);
	});

	it('Should fail to create test', async () => {
		const spy = jest.spyOn(Test, 'bulkCreate').mockImplementation(() => { throw new Error('error'); });
		await expect(testController.createMany([{
			input: '1',
			output: '2',
			example: true,
			ProblemId: problemId,
		}])).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to create test (without input)', async () => {
		await expect(testController.createMany([{
			output: '2',
			example: true,
			ProblemId: problemId,
		}])).rejects.toThrow();
	});

	it('Should fail to create test (without output)', async () => {
		await expect(testController.createMany([{
			input: '1',
			example: true,
			ProblemId: problemId,
		}])).rejects.toThrow();
	});
	
	it('Should fail to delete many tests', async () => {
		const spy = jest.spyOn(Test, 'destroy').mockImplementation(() => { throw new Error('error'); });
		await expect(testController.deleteMany([1, 2])).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to remove quiz', async () => {
		const spy = jest.spyOn(Test, 'destroy').mockImplementation(() => { throw new Error('error'); });
		await expect(testController.remove(1)).rejects.toThrow();
		spy.mockRestore();
	});
});