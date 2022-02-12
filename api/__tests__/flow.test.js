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
			password: bcrypt.hashSync('password', Number(process.env.HASH))
		});
		userId = user.id;
	});
    
	it('Basic flow', async () => {
        let res = await request.post('/login').send({
            email: 'email@email.com',
            password: 'password'
        }).expect(200);
        token = res.body.token;
	});
});