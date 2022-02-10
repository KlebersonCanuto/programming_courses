const userService = require('../../service/userService');
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
});