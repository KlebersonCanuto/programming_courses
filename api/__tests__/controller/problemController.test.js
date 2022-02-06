const problemController = require('../../controller/problemController');
const { Course, Module, Problem } = require('../../database/models');

describe('Test Problem', () => {  
	let moduleId;
	let id;

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
		moduleId = module.id;
	});

	it('Should get no problem', async () => {
		const problems = await problemController.getByModule(moduleId);
		expect(problems.length).toEqual(0);
	});

	it('Should create problem', async () => {
		const problem = await problemController.create({
			title: 'Problem',
			description: '123', 
			ModuleId: moduleId,
		}, 'fileid', 'link');
		id = problem.id;
		expect(problem.title).toEqual('Problem');
	});

	it('Should get one problem', async () => {
		const problems = await problemController.getByModule(moduleId);
		expect(problems.length).toEqual(1);
	});

	it('Should update problem', async () => {
		await problemController.update(id, {
			title: 'Problem2',
		}, 'fileid', 'link');
	});

	it('Should get by id', async () => {
		const problem = await problemController.getById(id);
		expect(problem.id).toEqual(id);
		expect(problem.title).toEqual('Problem2');
	});

	it('Should get by id without tests', async () => {
		const problem = await problemController.getWithoutTests(id);
		expect(problem.id).toEqual(id);
		expect(problem.title).toEqual('Problem2');
		expect(problem.tests.length).toEqual(0);
	});

	it('Should get tests', async () => {
		const tests = await problemController.getTests(id);
		expect(tests.length).toEqual(0);
	});

	it('Should get file id', async () => {
		const fileId = await problemController.getFileId(id);
		expect(fileId).toEqual('fileid');
	});

	it('Should get no problem with user (problem not exists)', async () => {
		const problem = await problemController.getUser(id*2, 1);
		expect(problem).toEqual(null);
	});

	it('Should get no problem by id (not exists)', async () => {
		const problem = await problemController.getById(id*2);
		expect(problem).toEqual(null);
	});

	it('Should get course unlocked', async () => {
		const lock = await problemController.checkCourseLocked(id);
		expect(lock).toEqual(0);
	});

	it('Should get problem without done user', async () => {
		const problem = await problemController.getUser(id, 1);
		expect(problem.done).toEqual(0);
	});

	it('Should fail to get problems', async () => {
		const spy = jest.spyOn(Problem, 'findAll').mockImplementation(() => { throw new Error('error'); });
		await expect(problemController.getByModule(moduleId)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to get problem by id', async () => {
		const spy = jest.spyOn(Problem, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		await expect(problemController.getById(id)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to get problem by id without tests', async () => {
		const spy = jest.spyOn(Problem, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		await expect(problemController.getWithoutTests(id)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to get problem by id and user', async () => {
		const spy = jest.spyOn(Problem, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		await expect(problemController.getUser(id, 1)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to get file id', async () => {
		const spy = jest.spyOn(Problem, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		await expect(problemController.getFileId(id)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to get file id (invalid id)', async () => {
		await expect(problemController.getFileId(id*2)).rejects.toThrow();
	});

	it('Should fail to get tests by id', async () => {
		const spy = jest.spyOn(Problem, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		await expect(problemController.getTests(id)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to get tests by id (invalid id)', async () => {
		await expect(problemController.getTests(id*2)).rejects.toThrow();
	});

	it('Should fail to create problem', async () => {
		const spy = jest.spyOn(Problem, 'create').mockImplementation(() => { throw new Error('error'); });
		await expect(problemController.create({})).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to create problem (invalid title)', async () => {
		await expect(problemController.create({
			title: '',
			description: '123', 
			ModuleId: moduleId,
		}, 'fileid', 'link')).rejects.toThrow();
	});

	it('Should fail to create problem (invalid description)', async () => {
		await expect(problemController.create({
			title: '123',
			description: '', 
			ModuleId: moduleId,
		}, 'fileid', 'link')).rejects.toThrow();
	});

	it('Should fail to create problem (invalid module id)', async () => {
		await expect(problemController.create({
			title: '123',
			description: '123', 
		}, 'fileid', 'link')).rejects.toThrow();
	});

	it('Should fail to create problem (invalid file)', async () => {
		await expect(problemController.create({
			title: '123',
			description: '123', 
			ModuleId: moduleId,
		}, '', 'link')).rejects.toThrow();
	});

	it('Should fail to update problem', async () => {
		const spy = jest.spyOn(Problem, 'update').mockImplementation(() => { throw new Error('error'); });
		await expect(problemController.update(id, {
			title: 'Problem 2',
		})).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to update problem (invalid title)', async () => {
		await expect(problemController.update(id, {
			title: '',
		})).rejects.toThrow();
	});

	it('Should fail to update problem (invalid description)', async () => {
		await expect(problemController.update(id, {
			description: '',
		})).rejects.toThrow();
	});

	it('Should fail to update problem (invalid title)', async () => {
		await expect(problemController.update(id, {
			title: '',
		})).rejects.toThrow();
	});

	it('Should fail to update problem (invalid description)', async () => {
		await expect(problemController.update(id, {
			description: '',
		})).rejects.toThrow();
	});

	it('Should fail to remove problem', async () => {
		const spy = jest.spyOn(Problem, 'destroy').mockImplementation(() => { throw new Error('error'); });
		await expect(problemController.remove(id)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to check course locked', async () => {
		const spy = jest.spyOn(Problem, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		await expect(problemController.checkCourseLocked(id)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to check course locked', async () => {
		await expect(problemController.checkCourseLocked(id*2)).rejects.toThrow();
	});

	it('Should remove problem', async () => {
		const qtd = await problemController.remove(id);
		expect(qtd).toEqual(1);
	});
});