const moduleService = require('../../service/moduleService');
const { Course, Module } = require('../../database/models');

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

describe('Test Module', () => {  
	let courseId;
	let id;

	beforeAll(async () => {
		await Course.destroy({ where: {} });
		
		const course = await Course.create({
			name: 'Course',
		});
		courseId = course.id
	});

	it('Should create course', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(200);
            expect(response.data.name).toEqual('Module');
            id = response.data.id;
        });

		await moduleService.create({
            body: {
                name: 'Module',
                CourseId: courseId
            }
		}, res);
	});

    it('Should get by id', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(200);
            expect(response.data.id).toEqual(id);
            expect(response.data.name).toEqual('Module');
        });

		await moduleService.get({
            params: {
                id
            }
		}, res);
	});

    it('Should update module', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(200);
        });

		await moduleService.update({
            body: {
                name: 'Module2'
            },
            params: {
                id
            }
		}, res);
	});

    it('Should get by id without user data', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(200);
            expect(response.data.id).toEqual(id);
            expect(response.data.name).toEqual('Module2');
        });

		await moduleService.getUser({
            params: {
                id
            }
		}, res);
	});

	it('Should failt to create module (invalid course)', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(400);
        });

		await moduleService.create({
            body: {
                name: 'Module'
            }
		}, res);
	});
    
	it('Should fail to create module (invalid name)', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(400);
        });

		await moduleService.create({
            body: {
                CourseId: courseId
            }
		}, res);
	});

    it('Should fail to update module (invalid name)', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(400);
        });

		await moduleService.update({
            body: {
            },
            params: {
                id
            }
		}, res);
	});

    it('Should remove module', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(200);
        });

		await moduleService.remove({
            params: {
                id
            }
		}, res);
	});
});