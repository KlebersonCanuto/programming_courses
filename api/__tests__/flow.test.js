const supertest = require('supertest');
const bcrypt = require('bcrypt');

const { Course, User } = require('../database/models');
const app = require('../server');

const request = supertest(app);
require('dotenv').config();

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
		const moduleId1 = res.body.data.id;	

		res = await request.post('/modules').send({
			name: "Modulo 2",
			CourseId: courseId
		}).set('authorization', token).expect(200);
		const moduleId2 = res.body.data.id;	

		res = await request.post('/modules').send({
			name: "Modulo 3",
			CourseId: courseId
		}).set('authorization', token).expect(200);
		const moduleId3 = res.body.data.id;

		// cadastrar 1 "tipo" de cada em cada modulo
		// cada modulo terá um dos "tipos" com 2 registros
 
		await request.patch(`/courses/${courseId}`).set('authorization', token).expect(200);

		// concluir com o usuário
		// O último "tipo" a terminar de cada modulo será o que tem 2 registros
	});
});