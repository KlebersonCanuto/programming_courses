const moduleController = require('../../controller/moduleController');
const { Course, Module } = require('../../database/models');

describe('Test Module', () => {  
	let courseId;
	let id;

	beforeAll(async () => {
		await Course.destroy({ where: {} });
		
		const course = await Course.create({
			name: 'Course',
		});
		courseId = course.id;
	});

	it('Should get no module', async () => {
		const modules = await moduleController.getByCourse(courseId);
		expect(modules.length).toEqual(0);
	});

	it('Should create module', async () => {
		const module = await moduleController.create({
			name: 'Module',
			CourseId: courseId,
		});
		id = module.id;
		expect(module.name).toEqual('Module');
	});

	it('Should update module', async () => {
		await moduleController.update(id, {
			name: 'Module2',
		});
	});

	it('Should get by id', async () => {
		const module = await moduleController.getById(id);
		expect(module.id).toEqual(id);
		expect(module.name).toEqual('Module2');
	});

	it('Should get 1 module', async () => {
		const modules = await moduleController.getByCourse(courseId);
		expect(modules.length).toEqual(1);
	});

	it('Should get no module with user (module not exists)', async () => {
		const module = await moduleController.getByIdAndUser(id*2, 1);
		expect(module).toEqual(null);
	});

	it('Should get no module by id (not exists)', async () => {
		const module = await moduleController.getById(id*2);
		expect(module).toEqual(null);
	});

	it('Should get course unlocked', async () => {
		const lock = await moduleController.checkCourseLocked(id);
		expect(lock).toEqual(0);
	});

	it('Should get module without done user', async () => {
		const module = await moduleController.getByIdAndUser(id, 1);
		expect(module.doneMaterials).toEqual(null);
		expect(module.doneQuizzes).toEqual(null);
		expect(module.doneProblems).toEqual(null);
	});

	it('Should fail to get modules', async () => {
		const spy = jest.spyOn(Module, 'findAll').mockImplementation(() => { throw new Error('error'); });
		await expect(moduleController.getByCourse(courseId)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to get module by id', async () => {
		const spy = jest.spyOn(Module, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		await expect(moduleController.getById(id)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to get module by id and user', async () => {
		const spy = jest.spyOn(Module, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		await expect(moduleController.getByIdAndUser(id, 1)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to create module', async () => {
		const spy = jest.spyOn(Module, 'create').mockImplementation(() => { throw new Error('error'); });
		await expect(moduleController.create({
			name: 'Module 2',
			CourseId: courseId,
		})).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to create module (invalid course id)', async () => {
		await expect(moduleController.create({
			name: 'Module 2',
			CourseId: courseId*2,
		})).rejects.toThrow();
	});

	it('Should fail to create module (no name)', async () => {
		await expect(moduleController.create({
			CourseId: courseId,
		})).rejects.toThrow();
	});

	it('Should fail to create module (no course)', async () => {
		await expect(moduleController.create({
			name: 'Module 2',
		})).rejects.toThrow();
	});

	it('Should fail to update module', async () => {
		const spy = jest.spyOn(Module, 'update').mockImplementation(() => { throw new Error('error'); });
		await expect(moduleController.update(id, {
			name: 'Module 2',
		})).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to update module (invalid name)', async () => {
		await expect(moduleController.update(id, {
			name: '',
		})).rejects.toThrow();
	});

	it('Should fail to remove module', async () => {
		const spy = jest.spyOn(Module, 'destroy').mockImplementation(() => { throw new Error('error'); });
		await expect(moduleController.remove(id)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to check course locked', async () => {
		const spy = jest.spyOn(Module, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		await expect(moduleController.checkCourseLocked(id)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to check course locked', async () => {
		await expect(moduleController.checkCourseLocked(id*2)).rejects.toThrow();
	});

	it('Should remove module', async () => {
		const qtd = await moduleController.remove(id);
		expect(qtd).toEqual(1);
	});
});