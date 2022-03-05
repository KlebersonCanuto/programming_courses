const CourseErrors = {
	INVALID_NAME: new Error('Nome inválido'),
	FAILED_TO_CREATE_COURSE: new Error('Falha ao criar curso'),
	FAILED_TO_UPDATE_COURSE: new Error('Falha ao atualizar curso'),
	FAILED_TO_REMOVE_COURSE: new Error('Falha ao remover curso'),
	FAILED_TO_CHECK_COURSE_LOCKED: new Error('Falha ao verificar se o curso está bloqueado'),
	FAILED_TO_LOCK_COURSE: new Error('Falha ao bloquear curso'),
	FAILED_TO_GET_COURSE: new Error('Falha ao obter curso'),
	FAILED_TO_GET_COURSES: new Error('Falha ao obter cursos'),
};

const UserErrors = {
	INVALID_USERNAME: new Error('Nome de usuário inválido'),
	INVALID_EMAIL: new Error('Email inválido'),
	INVALID_PASSWORD: new Error('Senha inválida'),
	INVALID_CONFIRM_PASSWORD: new Error('Confirmação de senha inválida'),
	PASSWORD_DONT_MATCH: new Error('Senha e confirmação de senha diferentes'),
	FAILED_TO_CREATE_USER: new Error('Falha ao criar usuário'),
	FAILED_TO_UPDATE_USER: new Error('Falha ao atualizar usuário'),
	FAILED_TO_GET_USER: new Error('Falha ao obter usuário'),
};

const AuthenticationErrors = {
	FAILED_TO_VALIDATE_USER: new Error('Falha ao validar usuário'),
	FAILED_TO_GET_USER: new Error('Falha ao obter usuário'),
	USER_NOT_ADMIN: new Error('Usuário não é administrador'),
	INVALID_TOKEN: new Error('Token inválido'),
};

const FileErrors = {
	FAILED_TO_GET_FILE: new Error('Falha ao obter arquivo'),
	FAILED_TO_UPLOAD_FILE: new Error('Falha ao enviar arquivo'),
};

const MaterialErrors = {
	INVALID_TITLE: new Error('Título inválido'),
	INVALID_CONTENT: new Error('Conteúdo inválido'),
	INVALID_COMPLEMENTARY: new Error('Atributo complementar inválido'),
	INVALID_MODULE_ID: new Error('Módulo inválido'),
	INVALID_VIDEO_LINK: new Error('Link inválido'),
	FAILED_TO_GET_MATERIAL: new Error('Falha ao obter material'),
	FAILED_TO_CREATE_MATERIAL: new Error('Falha ao criar material'),
	FAILED_TO_UPDATE_MATERIAL: new Error('Falha ao atualizar material'),
	FAILED_TO_REMOVE_MATERIAL: new Error('Falha ao remover material'),
	FAILED_TO_CHECK_COURSE_LOCKED: new Error('Falha ao verificar se o curso está bloqueado'),
};

const ModuleErrors = {
	INVALID_NAME: new Error('Nome inválido'),
	INVALID_COURSE_ID: new Error('Curso inválido'),
	FAILED_TO_GET_MODULE: new Error('Falha ao obter módulo'),
	FAILED_TO_CREATE_MODULE: new Error('Falha ao criar módulo'),
	FAILED_TO_UPDATE_MODULE: new Error('Falha ao atualizar módulo'),
	FAILED_TO_REMOVE_MODULE: new Error('Falha ao remover módulo'),
	FAILED_TO_CHECK_COURSE_LOCKED: new Error('Falha ao verificar se o curso está bloqueado'),
};

const ProblemErrors = {
	INVALID_TITLE: new Error('Título inválido'),  
	INVALID_DESCRIPTION: new Error('Descrição inválida'),
	INVALID_TESTS: new Error('Testes inválidos'),
	INVALID_MODULE_ID: new Error('Módulo inválido'),
	INVALID_FILES: new Error('Arquivos inválidos'),
	INVALID_ANSWER: new Error('Resposta inválida'),
	INVALID_INPUT_ONLY: new Error('Atributo InputOnly inválido'),
	INVALID_INPUT: new Error('Input inválido'),
	INVALID_OUTPUT: new Error('Output inválido'),
	FAILED_TO_GET_PROBLEM: new Error('Falha ao obter problema'),
	FAILED_TO_CREATE_PROBLEM: new Error('Falha ao criar problema'),
	FAILED_TO_UPDATE_PROBLEM: new Error('Falha ao atualizar problema'),
	FAILED_TO_REMOVE_PROBLEM: new Error('Falha ao remover problema'),
	FAILED_TO_CHECK_COURSE_LOCKED: new Error('Falha ao verificar se o curso está bloqueado'),
};

const ProgressErrors = {
	FAILED_TO_ADD_POINTS: new Error('Falha ao adicionar pontos'),
	FAILED_TO_CHECK_COURSE_COMPLETED: new Error('Falha ao verificar se o curso foi completado'),
	FAILED_TO_CHECK_MODULE_COMPLETED: new Error('Falha ao verificar se o módulo foi completado'),
	FAILED_TO_SAVE_MATERIAL_MODULE_PROGRESS: new Error('Falha ao salvar progresso do material do módulo'),
	FAILED_TO_SAVE_PROBLEM_MODULE_PROGRESS: new Error('Falha ao salvar progresso do problema do módulo'),
	FAILED_TO_SAVE_QUIZ_MODULE_PROGRESS: new Error('Falha ao salvar progresso do quiz do módulo'),
	FAILED_TO_GET_POINTS: new Error('Falha ao obter pontos'),
	FAILED_TO_GET_MATERIAL: new Error('Falha ao obter progresso do material'),
	FAILED_TO_GET_QUIZ: new Error('Falha ao obter progresso do quiz'),
	FAILED_TO_GET_PROBLEM: new Error('Falha ao obter progresso do problema'),
	FAILED_TO_GET_DONE_MODULES: new Error('Falha ao obter módulos concluídos'),
	FAILED_TO_GET_DONE_QUIZZES: new Error('Falha ao obter quizzes concluídos'),
	FAILED_TO_GET_DONE_MATERIALS: new Error('Falha ao obter materiais concluídos'),
	FAILED_TO_GET_DONE_PROBLEMS: new Error('Falha ao obter problemas concluídos'),
	FAILED_TO_SAVE_MATERIAL_PROGRESS: new Error('Falha ao salvar progresso do material'),
	FAILED_TO_SAVE_QUIZ_PROGRESS: new Error('Falha ao salvar progresso do quiz'),
	FAILED_TO_SAVE_PROBLEM_PROGRESS: new Error('Falha ao salvar progresso do problema'),
	FAILED_TO_SAVE_ORACLE: new Error('Falha ao salvar solicitação ao oráculo'),
	FAILED_TO_SAVE_HINT: new Error('Falha ao salvar pedido de dica'),
	FAILED_TO_GET_RANKING: new Error('Falha ao obter ranking'),
};

const QuizErrors = {
	INVALID_TITLE: new Error('Título inválido'),
	INVALID_QUESTION: new Error('Pergunta inválida'),
	INVALID_ANSWER: new Error('Resposta inválida'),
	INVALID_OPTIONS: new Error('Opções inválidas'),
	INVALID_MODULE_ID: new Error('Módulo inválido'),
	FAILED_TO_GET_QUIZ: new Error('Falha ao obter quiz'),
	FAILED_TO_CREATE_QUIZ: new Error('Falha ao criar quiz'),
	FAILED_TO_UPDATE_QUIZ: new Error('Falha ao atualizar quiz'),
	FAILED_TO_REMOVE_QUIZ: new Error('Falha ao remover quiz'),
	FAILED_TO_CHECK_ANSWER: new Error('Falha ao verificar resposta'),
	FAILED_TO_CHECK_COURSE_LOCKED: new Error('Falha ao verificar se o curso está bloqueado'),
};

const TestErrors = {
	FAILED_TO_CREATE_MANY_TESTS: new Error('Falha ao criar muitos testes'),
	FAILED_TO_DELETE_MANY_TESTS: new Error('Falha ao deletar muitos testes'),
	FAILED_TO_UPDATE_TEST: new Error('Falha ao atualizar teste'),
	FAILED_TO_REMOVE_TEST: new Error('Falha ao remover teste'),
};

const ValidateErrors = {
	COURSE_LOCKED: new Error('Curso já está bloqueado'),
	COURSE_UNLOCKED: new Error('Curso está desbloqueado'),
};

const ExecErrors = {
	FAILED_TO_EXECUTE: new Error('Falha ao executar'),
	FAILED_TO_COMPARE: new Error('Falha ao comparar'),
	FAILED_TO_COMPARE_IO: new Error('Falha ao comparar entrada e saída'),
	FAILED_TO_GET_OUTPUT: new Error('Falha ao obter saída'),
};

module.exports = {
	CourseErrors,
	UserErrors,
	AuthenticationErrors,
	FileErrors,
	MaterialErrors,
	ModuleErrors,
	ProblemErrors,
	ProgressErrors,
	QuizErrors,
	TestErrors,
	ValidateErrors,
	ExecErrors
};