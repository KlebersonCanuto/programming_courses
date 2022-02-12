const bcrypt = require('bcrypt');

const login = require('../../utils/login');
const { User } = require('../../database/models');

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

describe('Test Login', () => {  
	let token;

	beforeAll(async () => {-
	await User.destroy({ where: {} });

	await User.create({
		username: 'User',
		password: bcrypt.hashSync('User', Number(process.env.HASH)),
		email: 'email@email.com'
	});
	});

	it('Should login', async () => {
		const res = generateResponse((response) => {
			expect(response.auth).toEqual(true);
			expect(res.code).toEqual(200);
			token = response.token;
		});

		await login.login({
			body: {
				email: 'email@email.com',
				password: 'User'
			}
		}, res);
	});

	it('Should not login (invalid password)', async () => {
		const res = generateResponse((response) => {
			expect(response.auth).toEqual(false);
			expect(res.code).toEqual(302);
		});

		await login.login({
			body: {
				email: 'email@email.com',
				password: 'User2'
			}
		}, res);
	});

	it('Should not login (no password)', async () => {
		const res = generateResponse((response) => {
			expect(response.auth).toEqual(false);
			expect(res.code).toEqual(400);
		});

		await login.login({
			body: {
				email: 'email@email.com'
			}
		}, res);
	});

	it('Should get user data', async () => {
		const res = generateResponse((response) => {
			expect(response.email).toEqual('email@email.com');
			expect(res.code).toEqual(200);
		});

		await login.getData({
			headers: {
				authorization: `${token}`
			}
		}, res);
	});

	it('Should get user valid', async () => {
		const res = generateResponse((response) => {
			expect(response.valid).toEqual(true);
			expect(res.code).toEqual(200);
		});

		login.isValid({
			headers: {
				authorization: `${token}`
			}
		}, res);
	});

	it('Should fail to get user data', async () => {
		const spy = jest.spyOn(User, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		const res = generateResponse(() => {
			expect(res.code).toEqual(400);
		});

		await login.getData({
			headers: {
				authorization: `${token}`
			}
		}, res);

		spy.mockRestore();
	});
    
	it('Should get invalid token', async () => {
		const res = generateResponse((response) => {
			expect(response.valid).toEqual(false);
			expect(res.code).toEqual(200);
		});

		login.isValid({
			headers: {
				authorization: 'token'
			}
		}, res);
	});

	it('Should get invalid (no token)', async () => {
		const res = generateResponse((response) => {
			expect(response.valid).toEqual(false);
			expect(res.code).toEqual(200);
		});

		login.isValid({
			headers: {
				authorization: ''
			}
		}, res);
	});

	it('Should fail to get user data (no token)', async () => {
		const res = generateResponse(() => {
			expect(res.code).toEqual(400);
		});

		login.getData({
			headers: {
				authorization: ''
			}
		}, res);
	});
});