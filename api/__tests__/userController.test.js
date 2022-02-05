const userController = require('../controller/userController');
const { User } = require('../database/models');

describe('Test User', () => {  
	let id;

	beforeAll(async () => {
		await User.destroy({ where: {} });
	});

	it('Should create user', async () => {
		const user = await userController.create({
			username: 'User',
			password: 'User',
			confirmPassword: 'User',
			email: 'email@email.com'
		});
		id = user.id;
		expect(user.username).toEqual('User');
	});

	it('Should get by id', async () => {
		const user = await userController.getById(id);
		expect(user.id).toEqual(id);
		expect(user.username).toEqual('User');
	});

	it('Should get no user', async () => {
		const user = await userController.getById(id*2);
		expect(user).toEqual(null);
	});

	it('Should get by email', async () => {
		const user = await userController.getByEmail('email@email.com');
		expect(user.id).toEqual(id);
		expect(user.username).toEqual('User');
	});


	it('Should get no user by email', async () => {
		const user = await userController.getById('email2@email.com');
		expect(user).toEqual(null);
	});


	it('Should update user', async () => {
		await userController.update(id, {
			username: 'User2',
		});
	});

	it('Should get by id updated username', async () => {
		const user = await userController.getById(id);
		expect(user.id).toEqual(id);
		expect(user.username).toEqual('User2');
	});


	it('Should fail to get user by id', async () => {
		const spy = jest.spyOn(User, 'findByPk').mockImplementation(() => { throw new Error('error'); });
		await expect(userController.getById(id)).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to get user by email', async () => {
		const spy = jest.spyOn(User, 'findOne').mockImplementation(() => { throw new Error('error'); });
		await expect(userController.getByEmail('email@email.com')).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to create user', async () => {
		const spy = jest.spyOn(User, 'create').mockImplementation(() => { throw new Error('error'); });
		await expect(userController.create({
			username: 'User',
			password: 'User',
			confirmPassword: 'User',
			email: 'email@email.com'
		})).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to create user (wrong confirm password)', async () => {
		await expect(userController.create({
			username: 'User',
			password: 'User',
			confirmPassword: 'User2',
			email: 'email@email.com'
		})).rejects.toThrow();
	});

	it('Should fail to update user', async () => {
		const spy = jest.spyOn(User, 'update').mockImplementation(() => { throw new Error('error'); });
		await expect(userController.update(id, {
			username: 'User 2',
		})).rejects.toThrow();
		spy.mockRestore();
	});

	it('Should fail to update user (invalid username)', async () => {
		await expect(userController.update(id, {
			username: '',
		})).rejects.toThrow();
	});
});