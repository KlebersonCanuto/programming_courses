const CourseErrors = {
  INVALID_NAME: new Error('Nome inválido'),
  COURSE_LOCKED: new Error('Curso já está bloqueado'),
  COURSE_UNLOCKED: new Error('Curso está desbloqueado'),
}

const UserErrors = {
  INVALID_USERNAME: new Error('Nome de usuário inválido'),
  INVALID_EMAIL: new Error('Email inválido'),
  INVALID_PASSWORD: new Error('Senha inválida'),
  INVALID_CONFIRM_PASSWORD: new Error('Confirmação de senha inválida'),
}

const AuthenticationErrors = {
  FAILED_TO_VALIDATE_USER: new Error('Falha ao validar usuário'),
  FAILED_TO_GET_USER: new Error('Falha ao obter usuário'),
}

const FileErrors = {
  FAILED_TO_GET_FILE: new Error('Falha ao obter arquivo'),
  FAILED_TO_UPLOAD_FILE: new Error('Falha ao enviar arquivo'),
}

const MaterialErrors = {
  INVALID_TITLE: new Error('Título inválido'),
  INVALID_CONTENT: new Error('Conteúdo inválido'),
  INVALID_COMPLEMENTARY: new Error('Atributo complementar inválido'),
  INVALID_MODULE_ID: new Error('Módulo inválido'),
  INVALID_VIDEO_LINK: new Error('Link inválido'),
}

const ModuleErrors = {
  INVALID_NAME: new Error('Nome inválido'),
  INVALID_COURSE_ID: new Error('Curso inválido'),
}

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
}

const ProgressErrors = {
  
}

const QuizErrors = {
  INVALID_TITLE: new Error('Título inválido'),
  INVALID_QUESTION: new Error('Pergunta inválida'),
  INVALID_ANSWER: new Error('Resposta inválida'),
  INVALID_MODULE_ID: new Error('Módulo inválido'),
}

const TestErrors = {
  
}

const ValidateErrors = {
  
}

const ExecErrors = {
  
}

const CommonErrors = {
  
}

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
  ExecErrors,
  CommonErrors
}