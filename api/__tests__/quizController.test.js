const quizController = require('../controller/quizController');
const { Course, Module, Quiz } = require('../database/models');

describe('Test Quiz', () => {  
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

	it('Should get no quiz', async () => {
		const quizzes = await quizController.getByModule(moduleId);
		expect(quizzes.length).toEqual(0);
	});

	it('Should create quiz', async () => {
		const quiz = await quizController.create({
			title: 'Quiz',
			question: '123', 
			hint: '123', 
			answers: ["123", "1", "2", "3"],
			number: 0,
			ModuleId: moduleId,
		});
		id = quiz.id;
		expect(quiz.title).toEqual('Quiz');
	});

	it('Should get one quiz', async () => {
		const quizzes = await quizController.getByModule(moduleId);
		expect(quizzes.length).toEqual(1);
	});

	it('Should update quiz', async () => {
		await quizController.update(id, {
			title: 'Quiz2',
		});
	});

	it('Should get by id', async () => {
		const quiz = await quizController.getById(id);
		expect(quiz.id).toEqual(id);
		expect(quiz.title).toEqual('Quiz2');
	});

	it('Should get by id without answers', async () => {
		const quiz = await quizController.getWithoutAnswers(id);
		expect(quiz.id).toEqual(id);
		expect(quiz.title).toEqual('Quiz2');
		expect(quiz.answers).toEqual([]);
	});

	it('Should wrong answer', async () => {
		const correct = await quizController.checkAnswer(id, '4');
		expect(correct).toEqual(false);
	});

	it('Should correct answer', async () => {
		const correct = await quizController.checkAnswer(id, '1');
		expect(correct).toEqual(true);
	});

	it('Should get no quiz with user (quiz not exists)', async () => {
		const quiz = await quizController.getUser(id*2, 1);
		expect(quiz).toEqual(null);
	});

	it('Should get no quiz by id (not exists)', async () => {
		const quiz = await quizController.getById(id*2);
		expect(quiz).toEqual(null);
	});

	it('Should get hint', async () => {
		const quiz = await quizController.getHint(id);
		expect(quiz).toEqual('123');
	});

	it('Should get course unlocked', async () => {
		const lock = await quizController.checkCourseLocked(id);
		expect(lock).toEqual(0);
	});

	it('Should get quiz without done user', async () => {
		const quiz = await quizController.getUser(id, 1);
		expect(quiz.done).toEqual(0);
	});

	it('Should fail to get quizzes', async () => {
		const spy = jest.spyOn(Quiz, 'findAll').mockImplementation(() => { throw new Error('error'); });
		await expect(quizController.getByModule(moduleId)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to get quiz by id', async () => {
		const spy = jest.spyOn(Quiz, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		await expect(quizController.getById(id)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to get quiz by id without answers', async () => {
		const spy = jest.spyOn(Quiz, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		await expect(quizController.getWithoutAnswers(id)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to get hint', async () => {
		const spy = jest.spyOn(Quiz, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		await expect(quizController.getHint(id)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to get hint (invalid quiz)', async () => {
		await expect(quizController.getHint(id*2)).rejects.toThrow();
	});

	it('Should fail to get quiz by id and user', async () => {
		const spy = jest.spyOn(Quiz, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		await expect(quizController.getUser(id, 1)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to create quiz', async () => {
		const spy = jest.spyOn(Quiz, 'create').mockImplementation(() => { throw new Error('error'); });
		await expect(quizController.create({
			title: 'Quiz2',
			question: '123', 
			hint: '123', 
			answers: ["123", "1", "2", "3"],
			number: 0,
			ModuleId: moduleId,
		})).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to create quiz (invalid title)', async () => {
		await expect(quizController.create({
			title: '',
			question: '123', 
			hint: '123', 
			answers: ["123", "1", "2", "3"],
			number: 0,
			ModuleId: moduleId,
		})).rejects.toThrow();
	});

	it('Should fail to create quiz (invalid question)', async () => {
		await expect(quizController.create({
			title: 'Quiz2',
			question: '', 
			hint: '123', 
			answers: ["123", "1", "2", "3"],
			number: 0,
			ModuleId: moduleId,
		})).rejects.toThrow();
	});

	it('Should fail to create quiz (invalid answers)', async () => {
		await expect(quizController.create({
			title: 'Quiz2',
			question: '123', 
			hint: '123', 
			answers: [],
			number: 0,
			ModuleId: moduleId,
		})).rejects.toThrow();
	});

	it('Should fail to create quiz (invalid moduleId)', async () => {
		await expect(quizController.create({
			title: 'Quiz2',
			question: '123', 
			hint: '', 
			answers: ["123", "1", "2", "3"],
			number: 0,
		})).rejects.toThrow();
	});

	it('Should fail to update quiz', async () => {
		const spy = jest.spyOn(Quiz, 'update').mockImplementation(() => { throw new Error('error'); });
		await expect(quizController.update(id, {
			title: 'Quiz 2',
		})).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to update quiz (invalid title)', async () => {
		await expect(quizController.update(id, {
			title: '',
		})).rejects.toThrow();
	});

	it('Should fail to update quiz (invalid question)', async () => {
		await expect(quizController.update(id, {
			question: '',
		})).rejects.toThrow();
	});
	
	it('Should fail to update quiz (invalid answers)', async () => {
		await expect(quizController.update(id, {
			answers: [],
		})).rejects.toThrow();
	});

	it('Should fail to remove quiz', async () => {
		const spy = jest.spyOn(Quiz, 'destroy').mockImplementation(() => { throw new Error('error'); });
		await expect(quizController.remove(id)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to check answer', async () => {
		const spy = jest.spyOn(Quiz, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		await expect(quizController.checkAnswer(id, '1')).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to check answer (invalid id)', async () => {
		await expect(quizController.checkAnswer(id*2, '1')).rejects.toThrow();
	});

	it('Should fail to check course locked', async () => {
		const spy = jest.spyOn(Quiz, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		await expect(quizController.checkCourseLocked(id)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to check course locked', async () => {
		await expect(quizController.checkCourseLocked(id*2)).rejects.toThrow();
	});

	it('Should remove quiz', async () => {
		const qtd = await quizController.remove(id);
		expect(qtd).toEqual(1);
	});
});