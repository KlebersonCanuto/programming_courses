const Problem = require('../controller/problemController');
const FileService = require('./fileService');
const TestService = require('./testService');
const ProgressService = require('./progressService');

const get = async (req, res) => {
  try {
    const id = req.params.id;
    const problem = await Problem.getById(id);
    res.status(200).send({data: problem});
  } catch (err) {
    res.status(400).send();
  }
}

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const problem = await Problem.getUser(id);
    res.status(200).send({data: problem});
  } catch (err) {
    res.status(400).send();
  }
}

const validateSubmit = (body) => {
  const { answer } = body;
  if (!answer) {
    throw 400;
  }
}

const submit = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.params.userId;
    const body = req.body;
    validateSubmit(body);
    const answer = body.answer;
    const tests = await Problem.getTests(id);
    const correct = await TestService.compare(tests, answer);
    await ProgressService.saveProblem(id, userId, correct);
    res.status(200).send({correct});
  } catch (err) {
    res.status(400).send();
  }
}

const validateOracle = (body) => {
  const { inputOnly, input, output } = body;
  if (inputOnly !== false && inputOnly !== true) {
    throw 400;
  }
  if (!input) {
    throw 400;
  }
  if (!inputOnly && !output) {
    throw 400;
  }
}

const oracle = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.params.userId;
    const body = req.body;
    validateOracle(body);
    const inputOnly = body.inputOnly;
    const file_id = await Problem.getFileId(id);
    if (inputOnly) {
      const output = await TestService.getOutput(file_id, body.input);
      await ProgressService.saveOracle(id, userId, inputOnly);
      res.status(200).send({output});
    } else {
      const correct = await TestService.compareIO(file_id, body.input, body.output);
      await ProgressService.saveOracle(id, userId, inputOnly);
      res.status(200).send({correct});
    }
  } catch (err) {
    res.status(400).send();
  }
}

const validateCreate = (body, file) => {
  const { title, description, tests, ModuleId } = body;
  if (!title) {
    throw 400;
  }
  if (!description) {
    throw 400;
  }
  if (!ModuleId) {
    throw 400;
  }
  if (!file) {
    throw 400;
  }
  if (!tests || !tests.length) {
    throw 400;
  }
}

const create = async (req, res) => {
  try {
    const { file, body } = req;
    validateCreate(body, file);
    const file_id = await FileService.uploadFile(file);
    const problem = await Problem.create(body, file_id);
    const parsedTests = JSON.parse(body.tests);
    const tests = parsedTests.map(e => {
      e.ProblemId = problem.id;
      return e;
    });
    try {
      await TestService.register(tests, file_id);
    } catch (err) {
      await Problem.remove(problem.id);
      throw err;
    }
    res.status(200).send({data: problem});
  } catch (err) {
    res.status(400).send();
  }
}

const validateUpdate = (body) => {
  const { title, description, tests } = body;
  if (!title) {
    throw 400;
  }
  if (!description) {
    throw 400;
  }
  if (!tests || !tests.length) {
    throw 400;
  }
}

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { file, body } = req;
    validateUpdate(body);
    let parsedTests = JSON.parse(body.tests);
    let file_id;
    if (file) {
      file_id = await FileService.uploadFile(file);
      parsedTests = parsedTests.map(e => {
        e.output = null;
        return e;
      });
    } else {
      file_id = await Problem.getFileId(id);
    }

    parsedTests = parsedTests.filter(e => !e.output);
    const tests = await TestService.register(parsedTests, file_id);
    const testsId = tests.map(e => e.id);
    let problem;
    try {
      problem = await Problem.update(id, body, file_id);
    } catch (err) {
      await TestService.deleteMany(testsId);
      throw err;
    }
    res.status(200).send({data: problem});
  } catch (err) {
    res.status(400).send();
  }
}

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const problem = await Problem.remove(id);
    res.status(200).send({data: problem});
  } catch (err) {
    res.status(400).send();
  }
}

module.exports = {
  get,
  getUser,
  submit,
  oracle,
  create,
  update,
  remove
};