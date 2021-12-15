const Module = require('../controller/moduleController');
const ProgressService = require('./progressService');

const get = async (req, res) => {
  try{
    const id = req.params.id;
    const module = await Module.getById(id);
    const doneQuizzes = await ProgressService.getDoneQuizzes(id, req.params.userId)
    const doneQuizzesIds = doneQuizzes.map(e => e.id);
    const quizzes = module.quizzes.map(quiz => {
      return {
        ...quiz.dataValues,
        done: doneQuizzesIds.includes(quiz.id)
      }
    })
    const response = {
      name: module.name,
      materials: module.materials,
      quizzes,
      problems: module.problems,
    }
    res.status(200).send({data: response});
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
  create,
  update,
  remove
};