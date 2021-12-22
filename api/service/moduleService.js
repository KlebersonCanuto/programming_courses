const Module = require('../controller/moduleController');
const ProgressService = require('./progressService');

const generateResponseGet = (module, doneQuizzes, doneMaterials, doneProblems) => {
  const doneQuizzesId = doneQuizzes.map(e => e.QuizId);
  const quizzes = module.quizzes.map(quiz => {
    return {
      ...quiz.dataValues,
      done: doneQuizzesId.includes(quiz.id)
    }
  });

  const doneMaterialsId = doneMaterials.map(e => e.MaterialId);
  const materials = module.materials.map(material => {
    return {
      ...material.dataValues,
      done: doneMaterialsId.includes(material.id)
    }
  });

  const doneProblemsIs = doneProblems.map(e => e.ProblemId);
  const problems = module.problems.map(problem => {
    return {
      ...problem.dataValues,
      done: doneProblemsIs.includes(problem.id)
    }
  });

  return {
    name: module.name,
    done: module.done,
    materials,
    quizzes,
    problems,
  };
}

const getUser = async (req, res) => {
  try{
    const { id, userId } = req.params;
    let response;
    if (userId) {
      const module = await Module.getByIdAndUser(id, userId);
      const doneQuizzes = await ProgressService.getDoneQuizzes(id, userId);
      const doneMaterials = await ProgressService.getDoneMaterials(id, userId);
      const doneProblems = await ProgressService.getDoneProblems(id, userId);
      response = generateResponseGet(module, doneQuizzes, doneMaterials, doneProblems);
    } else {
      response = await Module.getById(id);
    }
    res.status(200).send({data: response});
  } catch(err){
    res.status(400).send();
  }
}

const get = async (req, res) => {
  try{
    const id = req.params.id;
    const module = await Module.getById(id);
    res.status(200).send({data: module});
  } catch(err){
    res.status(400).send();
  }
}

const validateCreate = (body) => {
  const { name, CourseId } = body;
  if (!name) {
    throw 400;
  }
  if (!CourseId) {
    throw 400;
  }
}

const create = async (req, res) => {
  try{
    const body = req.body;
    validateCreate(body);
    const module = await Module.create(body);
    res.status(200).send({data: module});
  } catch(err){
    res.status(400).send();
  }
}

const validateUpdate = (body) => {
  const { name } = body;
  if (!name) {
    throw 400;
  }
}

const update = async (req, res) => {
  try{
    const id = req.params.id;
    const body = req.body;
    validateUpdate(body);
    const module = await Module.update(id, body);
    res.status(200).send({data: module});
  } catch(err){
    res.status(400).send();
  }
}

const remove = async (req, res) => {
  try{
    const id = req.params.id;
    const module = await Module.remove(id);
    res.status(200).send({data: module});
  } catch(err){
    res.status(400).send();
  }
}

module.exports = {
  get,
  getUser,
  create,
  update,
  remove
};