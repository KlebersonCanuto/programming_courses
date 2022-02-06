const materialController = require('../controller/materialController');
const { Course, Module, Material } = require('../database/models');

describe('Test Material', () => {  
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

	it('Should get no material', async () => {
		const materials = await materialController.getNotComplementary(moduleId);
		expect(materials.length).toEqual(0);
	});

	it('Should create material complementary', async () => {
		const material = await materialController.create({
			title: 'Material',
			content: '123', 
			complementary: true,
			number: 0,
			video_link: '123',
			ModuleId: moduleId,
		});
		id = material.id;
		expect(material.title).toEqual('Material');
	});

	it('Should get no material (all complementary)', async () => {
		const materials = await materialController.getNotComplementary(moduleId);
		expect(materials.length).toEqual(0);
	});

	it('Should remove material', async () => {
		const qtd = await materialController.remove(id);
		expect(qtd).toEqual(1);
	});

	it('Should create material', async () => {
		const material = await materialController.create({
			title: 'Material',
			content: '123', 
			complementary: false,
			number: 0,
			video_link: '',
			ModuleId: moduleId,
		});
		id = material.id;
		expect(material.title).toEqual('Material');
	});

	it('Should get one material', async () => {
		const materials = await materialController.getNotComplementary(moduleId);
		expect(materials.length).toEqual(1);
	});

	it('Should update material', async () => {
		await materialController.update(id, {
			title: 'Material2',
		});
	});

	it('Should get by id', async () => {
		const material = await materialController.getById(id);
		expect(material.id).toEqual(id);
		expect(material.title).toEqual('Material2');
	});

	it('Should get no material with user (material not exists)', async () => {
		const material = await materialController.getUser(id*2, 1);
		expect(material).toEqual(null);
	});

	it('Should get no material by id (not exists)', async () => {
		const material = await materialController.getById(id*2);
		expect(material).toEqual(null);
	});

	it('Should get course unlocked', async () => {
		const lock = await materialController.checkCourseLocked(id);
		expect(lock).toEqual(0);
	});

	it('Should get material without done user', async () => {
		const material = await materialController.getUser(id, 1);
		expect(material.done).toEqual(0);
	});

	it('Should fail to get materials', async () => {
		const spy = jest.spyOn(Material, 'findAll').mockImplementation(() => { throw new Error('error'); });
		await expect(materialController.getNotComplementary(moduleId)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to get material by id', async () => {
		const spy = jest.spyOn(Material, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		await expect(materialController.getById(id)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to get material by id and user', async () => {
		const spy = jest.spyOn(Material, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		await expect(materialController.getUser(id, 1)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to create material', async () => {
		const spy = jest.spyOn(Material, 'create').mockImplementation(() => { throw new Error('error'); });
		await expect(materialController.create({
			title: 'Material 2',
			content: '123', 
			complementary: false,
			number: 0,
			video_link: '',
			ModuleId: moduleId,
		})).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to create material (no title)', async () => {
		await expect(materialController.create({
			title: '',
			content: '123', 
			complementary: false,
			number: 0,
			video_link: '',
			ModuleId: moduleId,
		})).rejects.toThrow();
	});

	it('Should fail to create material (no content)', async () => {
		await expect(materialController.create({
			title: 'Material 2',
			content: '', 
			complementary: false,
			number: 0,
			video_link: '',
			ModuleId: moduleId,
		})).rejects.toThrow();
	});

	it('Should fail to create material (no moduleId)', async () => {
		await expect(materialController.create({
			title: 'Material 2',
			content: '123', 
			complementary: false,
			number: 0,
			video_link: '',
		})).rejects.toThrow();
	});

	it('Should fail to create material (invalid moduleId)', async () => {
		await expect(materialController.create({
			title: 'Material 2',
			content: '123', 
			complementary: false,
			number: 0,
			video_link: '',
			ModuleId: moduleId*2,
		})).rejects.toThrow();
	});

	it('Should fail to update material', async () => {
		const spy = jest.spyOn(Material, 'update').mockImplementation(() => { throw new Error('error'); });
		await expect(materialController.update(id, {
			title: 'Material 2',
		})).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to update material (invalid title)', async () => {
		await expect(materialController.update(id, {
			title: '',
		})).rejects.toThrow();
	});

	it('Should fail to update material (invalid content)', async () => {
		await expect(materialController.update(id, {
			content: '',
		})).rejects.toThrow();
	});

	it('Should fail to remove material', async () => {
		const spy = jest.spyOn(Material, 'destroy').mockImplementation(() => { throw new Error('error'); });
		await expect(materialController.remove(id)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to check course locked', async () => {
		const spy = jest.spyOn(Material, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		await expect(materialController.checkCourseLocked(id)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to check course locked', async () => {
		await expect(materialController.checkCourseLocked(id*2)).rejects.toThrow();
	});

	it('Should remove material', async () => {
		const qtd = await materialController.remove(id);
		expect(qtd).toEqual(1);
	});
});