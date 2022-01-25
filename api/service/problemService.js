const Problem = require('../controller/problemController');
const FileService = require('./fileService');
const TestService = require('./testService');
const ProgressService = require('./progressService');
const ShellService = require('../utils/shell');
const Logger = require('../utils/logger');
const Errors = require('../utils/errors');

const logger = new Logger('problemService');

const get = async (req, res) => {
  try {
    const id = req.params.id;
    logger.debug('get', id);
    const problem = await Problem.getById(id);
    res.status(200).send({data: problem});
  } catch (err) {
    logger.error('get', err);
    res.status(400).send({message: err.message});
  }
}

const getUser = async (req, res) => {
  try {
    const { id, userId } = req.params;
    logger.debug('getUser', `problem id: ${id}`, `user id: ${userId}`);
    let problem;
    if (userId) {
      problem = await Problem.getUser(id, userId);
    } else {
      problem = await Problem.getWithoutTests(id);
    }
    res.status(200).send({data: problem});
  } catch (err) {
    logger.error('getUser', err);
    res.status(400).send({message: err.message});
  }
}

const validateSubmit = (body) => {
  const { answer } = body;
  if (!answer) {
    throw Errors.ProblemErrors.INVALID_ANSWER;
  }
}

const submit = async (req, res) => {
  try {
    const { id, userId } = req.params;
    logger.debug('submit', `problem id: ${id}`, `user id: ${userId}`);
    const body = req.body;
    validateSubmit(body);
    const answer = body.answer;
    const tests = await Problem.getTests(id);
    logger.info('submit', `comparing tests`);
    const correct = await TestService.compare(tests, answer);
    logger.info('submit', `saving progress`);
    await ProgressService.saveProblem(id, userId, correct);
    res.status(200).send({correct});
  } catch (err) {
    logger.error('submit', err);
    res.status(400).send({message: err.message});
  }
}

const exec = async (req, res) => {
  try {
    const code = req.body.code;
    const input = req.body.input;
    logger.info('exec', `executing code`);
    const output = await ShellService.getOutput(code, input);
    res.status(200).send({output});
  } catch (err) {
    logger.error('exec', err);
    res.status(400).send({message: err.message});
  }
}

const validateOracle = (body) => {
  const { inputOnly, input, output } = body;
  if (inputOnly !== false && inputOnly !== true) {
    throw Errors.ProblemErrors.INVALID_INPUT_ONLY;
  }
  if (!input) {
    throw Errors.ProblemErrors.INVALID_INPUT;
  }
  if (!inputOnly && !output) {
    throw Errors.ProblemErrors.INVALID_OUTPUT;
  }
}

const oracle = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const body = req.body;
    validateOracle(body);
    const inputOnly = body.inputOnly;
    logger.debug('oracle', `problem id: ${id}`, `user id: ${userId}`, `input only: ${inputOnly}`);
    const file_id = await Problem.getFileId(id);
    if (inputOnly) {
      const output = await TestService.getOutput(file_id, body.input);
      logger.info('oracle', `saving progress`);
      await ProgressService.saveOracle(id, userId, inputOnly);
      res.status(200).send({output});
    } else {
      const correct = await TestService.compareIO(file_id, body.input, body.output);
      logger.info('oracle', `saving progress`);
      await ProgressService.saveOracle(id, userId, inputOnly, correct);
      res.status(200).send({correct});
    }
  } catch (err) {
    logger.error('oracle', err);
    res.status(400).send({message: err.message});
  }
}

const validateCreate = (body, files) => {
  const { title, description, tests, ModuleId } = body;
  if (!title) {
    throw Errors.ProblemErrors.INVALID_TITLE;
  }
  if (!description) {
    throw Errors.ProblemErrors.INVALID_DESCRIPTION;
  }
  if (!ModuleId) {
    throw Errors.ProblemErrors.INVALID_MODULE_ID;
  }
  if (!files || !files.length) {
    throw Errors.ProblemErrors.INVALID_FILES;
  }
  
  if (!tests || tests === '[]') {
    throw Errors.ProblemErrors.INVALID_TESTS;
  }
}

const create = async (req, res) => {
  try {
    const { files, body } = req;
    validateCreate(body, files);

    const file = files[0];
    logger.debug('create', `files length: ${files.length}`);
    const file_id = await FileService.uploadFile(file, false);

    let image_link = '';
    if (files.length > 1) {
      const image = files[1]
      logger.info('create', 'uploading image');
      const image_id = await FileService.uploadFile(image, true);
      image_link = `https://drive.google.com/uc?id=${image_id}`;
    }

    logger.debug('create', `file_id: ${file_id}`, `image link: ${image_link}`);
    const problem = await Problem.create(body, file_id, image_link);
    const parsedTests = JSON.parse(body.tests);
    const tests = parsedTests.map(e => {
      e.ProblemId = problem.id;
      return e;
    });

    try {
      logger.info('create', 'creating tests');
      await TestService.register(tests, file_id);
    } catch (err) {
      logger.error('create', err);
      await Problem.remove(problem.id);
      throw err;
    }
    
    res.status(200).send({data: problem});
  } catch (err) {
    logger.error('create', err);
    res.status(400).send({message: err.message});
  }
}

const validateUpdate = (body) => {
  const { title, description, tests } = body;
  if (!title) {
    throw Errors.ProblemErrors.INVALID_TITLE;
  }
  if (!description) {
    throw Errors.ProblemErrors.INVALID_DESCRIPTION;
  }
  if (!tests || !tests.length) {
    throw Errors.ProblemErrors.INVALID_TESTS;
  }
}

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { files, body } = req;
    validateUpdate(body);
    let parsedTests = JSON.parse(body.tests);
    let file_id;
    let image_link;
    for (let file of files) {
      if (file.mimetype.includes('image')) {
        logger.info('update', 'uploading image');
        const image_id = await FileService.uploadFile(file, true);
        image_link = `https://drive.google.com/uc?id=${image_id}`;
      } else {
        logger.info('update', 'uploading file');
        file_id = await FileService.uploadFile(file, false);
        parsedTests = parsedTests.map(e => {
          e.output = null;
          return e;
        });
      }
    }
    if (!file_id) {
      file_id = await Problem.getFileId(id);
    }
    logger.debug('update', `problem id: ${id}`, `image link: ${image_link}`, `file_id: ${file_id}`);

    parsedTests = parsedTests.filter(e => !e.output);
    const tests = await TestService.register(parsedTests, file_id);
    const testsId = tests.map(e => e.id);
    let problem;
    try {
      logger.info('update', 'updating problem');
      problem = await Problem.update(id, body, file_id, image_link);
    } catch (err) {
      logger.error('update', err);
      await TestService.deleteMany(testsId);
      throw err;
    }
    res.status(200).send({data: problem});
  } catch (err) {
    logger.error('update', err);
    res.status(400).send({message: err.message});
  }
}

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    logger.debug('remove', `problem id: ${id}`);
    const problem = await Problem.remove(id);
    res.status(200).send({data: problem});
  } catch (err) {
    logger.error('remove', err);
    res.status(400).send({message: err.message});
  }
}

module.exports = {
  get,
  getUser,
  submit,
  exec,
  oracle,
  create,
  update,
  remove
};