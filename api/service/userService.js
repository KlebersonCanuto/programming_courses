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

const create = async (req, res) => {
  try{
    const user = await User.create(req.body);
    res.status(200).send({data: user});
  } catch(err){
    res.status(400).send();
  }
}

const update = async (req, res) => {
  try{
    const userId = req.params.userId;
    const user = await User.update(userId, req.body);
    res.status(200).send({data: user});
  } catch(err){
    res.status(400).send();
  }
}

module.exports = {
  get,
  create,
  update
};