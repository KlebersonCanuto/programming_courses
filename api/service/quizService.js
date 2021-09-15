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
    const id = req.params.id;
    const quiz = await Quiz.getUser(id);
    res.status(200).send({data: quiz});
  } catch(err){
    res.status(400).send();
  }
}

const submit = async (req, res) => {
  try{
    const id = req.params.id;
    const userId = req.params.userId;
    const answer = req.body.answer;
    const correct = await Quiz.checkAnswer(id, answer);
    await ProgressService.saveQuiz(id, userId, correct);
    res.status(200).send({correct});
  } catch(err){
    res.status(400).send();
  }
}

const create = async (req, res) => {
  try{
    const quiz = await Quiz.create(req.body);
    res.status(200).send({data: quiz});
  } catch(err){
    res.status(400).send();
  }
}

const update = async (req, res) => {
  try{
    const id = req.params.id;
    const quiz = await Quiz.update(id, req.body);
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

module.exports = {
  get,
  getUser,
  submit,
  create,
  update,
  remove
};