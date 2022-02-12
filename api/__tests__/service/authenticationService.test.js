const bcrypt = require('bcrypt');

const authenticationService = require('../../service/authenticationService');
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

describe('Test Authentication', () => {  
	let token;
	let tokenAdmin;

	beforeAll(async () => {-
	await User.destroy({ where: {} });

	await User.create({
		username: 'User',
		email: 'user@email.com',
		password: bcrypt.hashSync('password', Number(process.env.HASH)),
	});

	await User.create({
		username: 'Admin',
		email: 'admin@email.com',
		password: bcrypt.hashSync('password', Number(process.env.HASH)),
		admin: true
	});

	const resUser = generateResponse((response) => {
		token = response.token;
	});

	await login.login({
		body: {
			email: 'user@email.com',
			password: 'password'
		}
	}, resUser);

	const resAdmin = generateResponse((response) => {
		tokenAdmin = response.token;
	});

	await login.login({
		body: {
			email: 'admin@email.com',
			password: 'password'
		}
	}, resAdmin);
	});
    
	it('Should check admin', async () => {
 		await authenticationService.checkAdmin({
			headers: {
				authorization: tokenAdmin
			}
		}, null, () => {});
	});

	it('Should check not admin', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await authenticationService.checkAdmin({
			headers: {
				authorization: token
			}
		}, res, () => { throw new Error('error'); });
	});

	it('Should check not admin no token', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await authenticationService.checkAdmin({
			headers: {
			}
		}, res, () => { throw new Error('error'); });
	});

	it('Should check not admin invalid token', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await authenticationService.checkAdmin({
			headers: {
				authorization: 'token'
			}
		}, res, () => { throw new Error('error'); });
	});

	it('Should check user', async () => {
		await authenticationService.checkUser({
			headers: {
				authorization: token
			},
			params: {

			}
		}, null, () => {});
	});

	it('Should check not user no token', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await authenticationService.checkUser({
			headers: {
			}
		}, res, () => { throw new Error('error'); });
	});

	it('Should check not user invalid token', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await authenticationService.checkUser({
			headers: {
				authorization: 'token'
			}
		}, res, () => { throw new Error('error'); });
	});

	it('Should get user', async () => {
		await authenticationService.getUser({
			headers: {
				authorization: token
			},
			params: {
               
			}
		}, null, () => {});
	});

	it('Should get no user because no token', async () => {
		await authenticationService.getUser({
			headers: {
			}
		}, null, () => {});
	});

	it('Should get no user invalid token', async () => {
		const res = generateResponse((response) => {
			expect(res.code).toEqual(400);
		});

		await authenticationService.getUser({
			headers: {
				authorization: 'token'
			}
		}, res, () => { throw new Error('error'); });
	});
});