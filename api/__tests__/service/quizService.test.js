const quizService = require('../../service/quizService');
const { Course, Module, Quiz, User } = require('../../database/models');

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

describe('Test Quiz', () => {  
	let moduleId;
	let userId;
	let id;

	beforeAll(async () => {
		await Course.destroy({ where: {} });
		await User.destroy({ where: {} });
		
		const course = await Course.create({
			name: 'Course',
		});
		const courseId = course.id;

        const module = await Module.create({
			name: 'Course',
            CourseId: courseId
		});
		moduleId = module.id; 
	});

	it('Should create quiz', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(200);
            expect(response.data.title).toEqual('Quiz');
            expect(response.data.question).toEqual('123');
            id = response.data.id;
        });

		await quizService.create({
            body: {
                title: 'Quiz',
                question: '123', 
                hint: '123', 
                answers: ["123", "1", "2", "3"],
                ModuleId: moduleId,
            }
		}, res);
	});

    it('Should get by id', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(200);
            expect(response.data.id).toEqual(id);
            expect(response.data.title).toEqual('Quiz');
        });

		await quizService.get({
            params: {
                id
            }
		}, res);
	});

    it('Should update quiz', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(200);
        });

		await quizService.update({
            body: {
                title: 'Quiz2',
                question: '1234', 
                hint: '1234', 
                answers: ["1234", "1", "2", "3", "4"],
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
            expect(response.data.title).toEqual('Quiz2');
        });

		await quizService.getUser({
            params: {
                id
            }
		}, res);
	});

    it('Should get by id with user progress', async () => {
        const user = await User.create({
            username: 'User',
            password: "User",
            email: 'email@email.com',
        });
        userId = user.id;

        const res = generateResponse((response) => {
            expect(res.code).toEqual(200);
            expect(response.data.title).toEqual('Quiz2');
            expect(response.data.done).toEqual(0);
        });

		await quizService.getUser({
            params: {
                id,
                userId
            }
		}, res);
	});

    it('Should get hint', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(200);
            expect(response.data).toEqual('1234');
        });

		await quizService.hint({
            params: {
                id,
                userId
            }
		}, res);
	});

    it('Should submit quiz', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(200);
        });

		await quizService.submit({
            params: {
                id,
                userId
            },
            body: {
                answer: '3'
            }
		}, res);
	});

    it('Should get by id with user progress done', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(200);
            expect(response.data.title).toEqual('Quiz2');
            expect(response.data.done).toEqual(1);
        });

		await quizService.getUser({
            params: {
                id,
                userId
            }
		}, res);
	});

    it('Should fail to get quiz', async () => {
        const spy = jest.spyOn(Quiz, 'findByPk').mockImplementation(() => { throw new Error('error'); });
        const res = generateResponse((response) => {
            expect(res.code).toEqual(400);
        });

		await quizService.get({
            params: {
                id
            }
		}, res);
		spy.mockRestore();
	});

    it('Should fail to get quiz with user data', async () => {
        const spy = jest.spyOn(Quiz, 'findByPk').mockImplementation(() => { throw new Error('error'); });
        const res = generateResponse((response) => {
            expect(res.code).toEqual(400);
        });

		await quizService.getUser({
            params: {
                id
            }
		}, res);
		spy.mockRestore();
	});

	it('Should fail to create quiz (invalid title)', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(400);
        });

		await quizService.create({
            body: {
                title: '',
                question: '123', 
                hint: '123', 
                answers: ["123", "1", "2", "3"],
                ModuleId: moduleId,
            }
		}, res);
	});
    
	it('Should fail to create quiz (invalid question)', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(400);
        });

		await quizService.create({
            body: {
                title: 'Quiz',
                question: '', 
                hint: '123', 
                answers: ["123", "1", "2", "3"],
                ModuleId: moduleId,
            }
		}, res);
	});

    it('Should fail to create quiz (invalid answers)', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(400);
        });

		await quizService.create({
            body: {
                title: 'Quiz',
                question: '123', 
                hint: '123', 
                answers: [],
                ModuleId: moduleId,
            }
		}, res);
	});

    it('Should fail to create quiz (invalid moduleId)', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(400);
        });

		await quizService.create({
            body: {
                title: 'Quiz',
                question: '123', 
                hint: '123', 
                answers: ["123", "1", "2", "3"],
            }
		}, res);
	});

    it('Should fail to update quiz (invalid title)', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(400);
        });

		await quizService.update({
            body: {
                title: '',
                question: '123', 
                hint: '123', 
                answers: ["123", "1", "2", "3"],
            },
            params: {
                id
            }
		}, res);
	});

    
    it('Should fail to update quiz (invalid question)', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(400);
        });

		await quizService.update({
            body: {
                title: 'Quiz',
                question: '', 
                hint: '123', 
                answers: ["123", "1", "2", "3"],
            },
            params: {
                id
            }
		}, res);
	});

    
    it('Should fail to update quiz (invalid answers)', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(400);
        });

		await quizService.update({
            body: {
                title: 'Quiz',
                question: '123', 
                hint: '123', 
                answers: [],
            },
            params: {
                id
            }
		}, res);
	});

    it('Should fail to remove quiz', async () => {
        const spy = jest.spyOn(Quiz, 'destroy').mockImplementation(() => { throw new Error('error'); });
        const res = generateResponse((response) => {
            expect(res.code).toEqual(400);
        });

		await quizService.remove({
            params: {
                id
            }
		}, res);
		spy.mockRestore();
	});

    it('Should fail to get hint', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(400);
        });

		await quizService.hint({
            params: {
                id: id*2,
                userId
            }
		}, res);
	});


    it('Should fail to submit quiz', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(400);
        });

		await quizService.submit({
            params: {
                id,
                userId
            },
            body: {

            }
		}, res);
	});

    it('Should get no hint', async () => {
        const quiz = await Quiz.create({
            title: 'Quiz',
            question: '123', 
            answers: ["1", "2", "3"],
            ModuleId: moduleId
        });
        const quizId = quiz.id;

        const res = generateResponse((response) => {
            expect(res.code).toEqual(200);
            expect(response.data).toEqual('Não há dica disponível');
        });

		await quizService.hint({
            params: {
                id: quizId,
                userId
            }
		}, res);

        await Quiz.destroy(
            { where: { id: quizId } }
        )
	});

    it('Should remove quiz', async () => {
        const res = generateResponse((response) => {
            expect(res.code).toEqual(200);
        });

		await quizService.remove({
            params: {
                id
            }
		}, res);
	});
});