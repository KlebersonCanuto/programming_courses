const User = require('../controller/userController');
const Progress = require('./progressService');

const get = async (req, res) => {
  try{
    const userId = req.params.userId;
    const user = await User.getById(userId);
    const points = await Progress.getPoints(userId);
    res.status(200).send({user, points});
  } catch(err){
    res.status(400).send();
  }
}

const validateCreate = (body) => {
  const { username, password, confirmPassword, email } = body;
  if (!username) {
    throw 400;
  }
  if (!password) {
    throw 400;
  }
  if (!confirmPassword) {
    throw 400;
  }
  if (!email) {
    throw 400;
  }
}

const create = async (req, res) => {
  try{
    const body = req.body;
    validateCreate(body);
    const user = await User.create(body);
    res.status(200).send({data: user});
  } catch(err){
    res.status(400).send();
  }
}

const validateUpdate = (body) => {
  const { username } = body;
  if (!username) {
    throw 400;
  }
}

const update = async (req, res) => {
  try{
    const userId = req.params.userId;
    const body = req.body;
    validateUpdate(body);
    const user = await User.update(userId, body);
    res.status(200).send({data: user});
  } catch(err){
    res.status(400).send();
  }
}

const makeRanking = (rank) => {
  const formated = rank.map(e => {
    return {
      points: e.points,
      username: e.user.username
    };
  });
  return formated;
}

const ranking = async (_, res) => {
  try{
    const rank = await Progress.ranking();
    const formated = makeRanking(rank);
    res.status(200).send({rank: formated});
  } catch(err){
    res.status(400).send();
  }
}

module.exports = {
  get,
  create,
  update,
  ranking
};