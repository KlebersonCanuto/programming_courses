const userService = require('../../service/userService');
const { User, PointsUser } = require('../../database/models');

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
	let id;

	beforeAll(async () => {-
		await User.destroy({ where: {} });
	});
    
	it('Should create user', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(200);
            expect(response.data.username).toEqual('User');
            id = response.data.id;
        });

		await userService.create({
            body: {
                username: 'User',
                password: 'User',
                confirmPassword: 'User',
                email: 'email@email.com',
            }
		}, res);
	});

    it('Should get user', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(200);
            expect(response.user.username).toEqual('User');
            expect(response.points).toEqual(0);
        });

		await userService.get({
            params: {
                userId: id
            }
		}, res);
	});

    it('Should update user', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(200);
        });

		await userService.update({
            params: {
                userId: id
            },
            body: {
                username: 'User2',
            }
		}, res);
	});

    it('Should get user updated', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(200);
            expect(response.user.username).toEqual('User2');
        });

		await userService.get({
            params: {
                userId: id
            }
		}, res);
	});

    it('Should get ranking', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(200);
            expect(response.rank.length).toEqual(0);
        });

		await userService.ranking(null, res);
	});

    it('Should get ranking with points', async () => {
        await PointsUser.create({
            UserId: id,
            points: 10,
        });
        const res = generateResponse((response) => {
            expect(res.code).toEqual(200);
            expect(response.rank.length).toEqual(1);
        });

		await userService.ranking(null, res);
	});

    it('Should fail to get ranking', async () => {
        const spy = jest.spyOn(User, 'findAll').mockImplementation(() => { throw new Error('error'); });
        const res = generateResponse((response) => {
            expect(res.code).toEqual(400);
        });

		await userService.ranking(null, res);
		spy.mockRestore();
	});

    it('Should fail to get user', async () => {
        const spy = jest.spyOn(User, 'findByPk').mockImplementation(() => { throw new Error('error'); });
        const res = generateResponse((response) => {
            expect(res.code).toEqual(400);
        });

		await userService.get({
            params: {
                userId: id
            }
		}, res);
		spy.mockRestore();
	});

    it('Should fail to create user (invalid username)', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(400);
        });

		await userService.create({
            body: {
                username: '',
            }
		}, res);
	});

    it('Should fail to create user (invalid password)', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(400);
        });

		await userService.create({
            body: {
                username: 'User',
                password: '',
            }
		}, res);
	});

    it('Should fail to create user (invalid confirmPassword)', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(400);
        });

		await userService.create({
            body: {
                username: 'User',
                password: 'User',
                confirmPassword: '',
            }
		}, res);
	});

    it('Should fail to create user (invalid email)', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(400);
        });

		await userService.create({
            body: {
                username: 'User',
                password: 'User',
                confirmPassword: 'User',
            }
		}, res);
	});

    it('Should fail to update user (invalid username)', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(400);
        });

		await userService.update({
            body: {
                username: ''
            }, params: {
                userId: id
            }
		}, res);
	});
});