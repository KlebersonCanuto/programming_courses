const supertest = require('supertest');
const bcrypt = require('bcrypt');
const fs = require('fs');

const { Course, User } = require('../database/models');
const app = require('../server');

const request = supertest(app);
require('dotenv').config();

jest.setTimeout(60000);

describe('Test Flows', () => {  
	let userId;
	let token;

	beforeAll(async () => {-
	    await Course.destroy({ where: {} });
	    await User.destroy({ where: {} });

        const user = await User.create({
			username: 'User',
			email: 'email@email.com',
			password: bcrypt.hashSync('password', Number(process.env.HASH)),
			admin: true
		});
		userId = user.id;
	});

	afterAll(done => {
		app.close();
		done();
	});
    
	it('Basic flow', async () => {
        let res = await request.post('/login').send({
            email: 'email@email.com',
            password: 'password'
        }).expect(200);
        token = res.body.token;

		res = await request.post('/courses').send({
			name: "Curso de teste"
		}).set('authorization', token).expect(200);
		const courseId = res.body.data.id;

		res = await request.post('/modules').send({
			name: "Modulo 1",
			CourseId: courseId
		}).set('authorization', token).expect(200);
		const module1 = res.body.data.id;	

		res = await request.post('/modules').send({
			name: "Modulo 2",
			CourseId: courseId
		}).set('authorization', token).expect(200);
		const module2 = res.body.data.id;	

		res = await request.post('/modules').send({
			name: "Modulo 3",
			CourseId: courseId
		}).set('authorization', token).expect(200);
		const module3 = res.body.data.id;

		res = await request.post('/materials').send({
			title: "Material 1",
			content: "Material 1",
			ModuleId: module1,
			complementary: false,
			video_link: ''
		}).set('authorization', token).expect(200);
		const material1 = res.body.data.id;

		res = await request.post('/materials').send({
			title: "Material 2",
			content: "Material 2",
			ModuleId: module2,
			complementary: false,
			video_link: ''
		}).set('authorization', token).expect(200);
		const material2 = res.body.data.id;

		res = await request.post('/materials').send({
			title: "Material 3",
			content: "Material 3",
			ModuleId: module3,
			complementary: false,
			video_link: ''
		}).set('authorization', token).expect(200);
		const material3 = res.body.data.id;

		res = await request.post('/materials').send({
			title: "Material Extra",
			content: "Material Extra",
			ModuleId: module1,
			complementary: false,
			video_link: ''
		}).set('authorization', token).expect(200);
		const materialExtra = res.body.data.id;

		res = await request.post('/materials').send({
			title: "Material Complementar",
			content: "Material Complementar",
			ModuleId: module1,
			complementary: true,
			video_link: ''
		}).set('authorization', token).expect(200);
		const materialComplementary = res.body.data.id;

		res = await request.post('/quizzes').send({
			title: "Quiz 1",
			question: "Quiz 1",
			ModuleId: module1,
			answers: ['1', '11']
		}).set('authorization', token).expect(200);
		const quiz1 = res.body.data.id;

		res = await request.post('/quizzes').send({
			title: "Quiz 2",
			question: "Quiz 2",
			ModuleId: module2,
			answers: ['2', '22']
		}).set('authorization', token).expect(200);
		const quiz2 = res.body.data.id;

		res = await request.post('/quizzes').send({
			title: "Quiz 3",
			question: "Quiz 3",
			ModuleId: module3,
			answers: ['3', '33']
		}).set('authorization', token).expect(200);
		const quiz3 = res.body.data.id;

		res = await request.post('/quizzes').send({
			title: "Quiz Extra",
			question: "Quiz Extra",
			ModuleId: module2,
			answers: ['extra', 'extra extra']
		}).set('authorization', token).expect(200);
		const quizExtra = res.body.data.id;

		const test_file = `tmp/${process.env.TEST_FILE}`;
		const image_file = `tmp/${process.env.TEST_IMAGE_FILE}`;

		fs.copyFileSync(process.env.TEST_FILE, test_file);
		fs.copyFileSync(process.env.TEST_IMAGE_FILE, image_file);

		res = await request.post('/problems')
		.field('title', 'Problem 1')
		.field('description', 'Problem 1')
		.field('ModuleId', module1)
		.field('tests', JSON.stringify([{input: '1\n1'}]))
		.set('authorization', token).attach('files', test_file).attach('files', image_file).expect(200);
		const problem1 = res.body.data.id;

		res = await request.post('/problems')
		.field('title', 'Problem 2')
		.field('description', 'Problem 2')
		.field('ModuleId', module2)
		.field('tests', JSON.stringify([{input: '2\n2'}]))
		.set('authorization', token).attach('files', test_file).attach('files', image_file).expect(200);
		const problem2 = res.body.data.id;

		res = await request.post('/problems')
		.field('title', 'Problem 3')
		.field('description', 'Problem 3')
		.field('ModuleId', module3)
		.field('tests', JSON.stringify([{input: '3\n3'}]))
		.set('authorization', token).attach('files', test_file).attach('files', image_file).expect(200);
		const problem3 = res.body.data.id;

		res = await request.post('/problems')
		.field('title', 'Problem Extra')
		.field('description', 'Problem Extra')
		.field('ModuleId', module3)
		.field('tests', JSON.stringify([{input: '4\n4'}]))
		.set('authorization', token).attach('files', test_file).attach('files', image_file).expect(200);
		const problemExtra = res.body.data.id;

		await request.patch(`/courses/${courseId}`).set('authorization', token).expect(200);

		res = await request.post(`/problems/${problem1}`).send({
			answer: "x = int(input())\ny = int(input())\nprint(x+y)"
		})
		.set('authorization', token).expect(200);
		expect(res.body.correct).toEqual(true);

		res = await request.post(`/quizzes/${quiz1}`).send({
			answer: "1"
		})
		.set('authorization', token).expect(200);
		expect(res.body.correct).toEqual(true);

		res = await request.post(`/materials/${material1}`)
		.set('authorization', token).expect(200);
		expect(res.body.data).toEqual(material1.toString());

		res = await request.post(`/materials/${materialComplementary}`)
		.set('authorization', token).expect(200);
		expect(res.body.data).toEqual(materialComplementary.toString());

		res = await request.post(`/materials/${materialExtra}`)
		.set('authorization', token).expect(200);
		expect(res.body.data).toEqual(materialExtra.toString());

		res = await request.post(`/materials/${material2}`)
		.set('authorization', token).expect(200);
		expect(res.body.data).toEqual(material2.toString());

		res = await request.post(`/problems/${problem2}`).send({
			answer: "x = int(input())\ny = int(input())\nprint(x+y)"
		})
		.set('authorization', token).expect(200);
		expect(res.body.correct).toEqual(true);

		res = await request.post(`/quizzes/${quiz2}`).send({
			answer: "2"
		})
		.set('authorization', token).expect(200);
		expect(res.body.correct).toEqual(true);

		res = await request.post(`/quizzes/${quizExtra}`).send({
			answer: "extra"
		})
		.set('authorization', token).expect(200);
		expect(res.body.correct).toEqual(true);

		res = await request.post(`/quizzes/${quiz3}`).send({
			answer: "3"
		})
		.set('authorization', token).expect(200);
		expect(res.body.correct).toEqual(true);

		res = await request.post(`/materials/${material3}`)
		.set('authorization', token).expect(200);
		expect(res.body.data).toEqual(material3.toString());

		res = await request.post(`/problems/${problem3}`).send({
			answer: "x = int(input())\ny = int(input())\nprint(x+y)"
		})
		.set('authorization', token).expect(200);
		expect(res.body.correct).toEqual(true);

		res = await request.post(`/problems/${problemExtra}`).send({
			answer: "x = int(input())\ny = int(input())\nprint(x+y)"
		})
		.set('authorization', token).expect(200);
		expect(res.body.correct).toEqual(true);

		res = await request.get(`/users`).set('authorization', token).expect(200);
		expect(res.body.points).toEqual(99);
	});
});