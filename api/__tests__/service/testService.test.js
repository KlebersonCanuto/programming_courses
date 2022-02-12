const testService = require('../../service/testService');
const { Course, Module, Problem, Test } = require('../../database/models');

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

describe('Test test', () => {  
	let id;

	beforeAll(async () => {
		await Course.destroy({ where: {} });
		
		const course = await Course.create({
			name: 'Course',
		});
		const courseId = course.id;

		const module = await Module.create({
			name: 'Module',
			CourseId: courseId
		});
		const moduleId = module.id; 

		const problem = await Problem.create({
			ModuleId: moduleId,
			title: 'Problem',
			description: 'Problem',
			file_id: '123'
		});
		const problemId = problem.id;

		const test = await Test.create({
			ProblemId: problemId,
			input: "1\n2",
			output: "3"
		});
		id = test.id;
	});

	it('Should fail to remove test', async () => {
		const spy = jest.spyOn(Problem, 'destroy').mockImplementation(() => { throw new Error('error'); });
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await testService.remove({
			params: {
				id
			}
		}, res);
		spy.mockRestore();
	});

	it('Should remove problem', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(200);
		});

		await testService.remove({
			params: {
				id
			}
		}, res);
	});
});