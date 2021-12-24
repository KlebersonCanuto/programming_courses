const Quiz = require('../controller/quizController');
const ProgressService = require('./progressService');

const get = async (req, res) => {
  try{
    const id = req.params.id;
    const quiz = await Quiz.getById(id);
    res.status(200).send({data: quiz});
  } catch(err){
    res.status(400).send();
  }
}

const getUser = async (req, res) => {
  try{
    const { id, userId } = req.params;
    let quiz;
    if (userId) {
      quiz = await Quiz.getUser(id, userId);
    } else {
      quiz = await Quiz.getWithoutAnswers(id);
    }
    res.status(200).send({data: quiz});
  } catch(err){
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
  try{
    const { id, userId } = req.params;
    const body = req.body;
    validateSubmit(body);
    const answer = body.answer;
    const correct = await Quiz.checkAnswer(id, answer);
    await ProgressService.saveQuiz(id, userId, correct);
    res.status(200).send({correct});
  } catch(err){
    res.status(400).send();
  }
}

const validateCreate = (body) => {
  const { title, question, answers, ModuleId } = body;
  if (!title) {
    throw 400;
  }
  if (!question) {
    throw 400;
  }
  if (!answers || !answers.length) {
    throw 400;
  }
  if (!ModuleId) {
    throw 400;
  }
}

const create = async (req, res) => {
  try{
    const body = req.body;
    validateCreate(body);
    const quiz = await Quiz.create(body);
    res.status(200).send({data: quiz});
  } catch(err){
    res.status(400).send();
  }
}

const validateUpdate = (body) => {
  const { title, question, answers } = body;
  if (!title) {
    throw 400;
  }
  if (!question) {
    throw 400;
  }
  if (!answers || !answers.length) {
    throw 400;
  }
}

const update = async (req, res) => {
  try{
    const id = req.params.id;
    const body = req.body;
    validateUpdate(body);
    const quiz = await Quiz.update(id, body);
    res.status(200).send({data: quiz});
  } catch(err){
    res.status(400).send();
  }
}

const remove = async (req, res) => {
  try{
    const id = req.params.id;
    const quiz = await Quiz.remove(id);
    res.status(200).send({data: quiz});
  } catch(err){
    res.status(400).send();
  }
}

const hint = async (req, res) => {
  try {
    const { id, userId } = req.params;
    let hint = await Quiz.getHint(id);
    if (hint) {
      await ProgressService.saveHint(id, userId);
    } else {
      hint = "Não há dica disponível"
    }
    res.status(200).send({data: hint});
  } catch (err) {
    res.status(400).send();
  }
}

module.exports = {
  get,
  getUser,
  hint,
  submit,
  create,
  update,
  remove
};