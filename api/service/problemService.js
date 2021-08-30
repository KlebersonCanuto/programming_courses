const Problem = require('../controller/problemController');
const FileService = require('./fileService');
const TestService = require('./testService');

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
    problem.tests = problem.tests.filter(e => e.example);
    res.status(200).send({data: problem});
  } catch (err) {
    res.status(400).send();
  }
}

const submit = async (req, res) => {
  try {
    const id = req.params.id;
    res.status(200).send({data: id});
  } catch (err) {
    res.status(400).send();
  }
}

const create = async (req, res) => {
  try {
    const file_id = await FileService.uploadFile(req.file);
    const problem = await Problem.create(req.body, file_id);
    const parsedTests = JSON.parse(req.body.tests);
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

const update = async (req, res) => {
  try {
    const id = req.params.id;
    let parsedTests = JSON.parse(req.body.tests);
    let file_id;
    if (req.file) {
      file_id = await FileService.uploadFile(req.file);
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
      problem = await Problem.update(id, req.body, file_id);
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
  create,
  update,
  remove
};