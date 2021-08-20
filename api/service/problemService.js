const Problem = require('../controller/problemController');
const FileService = require('./fileService');
const TestService = require('./testService');

const get = async (req, res) => {
  try{
    const id = req.params.id;
    const problem = await Problem.getById(id);
    res.status(200).send({data: problem});
  } catch(err){
    res.status(400).send();
  }
}

const create = async (req, res) => {
  try{
    const file_id = await FileService.uploadFile(req.file);
    const problem = await Problem.create(req.body, file_id);
    const parsedTests = JSON.parse(req.body.tests);
    const problemTests = parsedTests.map(e => {
      e.ProblemId = problem.id;
      return e;
    });
    try {
      await TestService.register(problemTests, file_id);
    } catch (err) {
      await Problem.remove(problem.id);
      throw 400;
    }
    res.status(200).send({data: problem});
  } catch(err){
    res.status(400).send();
  }
}

const update = async (req, res) => {
  try{
    const id = req.params.id;
    let file_id;
    if (req.file) file_id = await FileService.uploadFile(req.file);
    const problem = await Problem.update(id, req.body, file_id);
    res.status(200).send({data: problem});
  } catch(err){
    res.status(400).send();
  }
}

const remove = async (req, res) => {
  try{
    const id = req.params.id;
    const problem = await Problem.remove(id);
    res.status(200).send({data: problem});
  } catch(err){
    res.status(400).send();
  }
}

module.exports = {
  get,
  create,
  update,
  remove
};