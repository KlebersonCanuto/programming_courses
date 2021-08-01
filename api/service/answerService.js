const Answer = require('../controller/answerController');

const get = async (req, res) => {
  try{
    const id = req.params.id;
    const answer = await Answer.getById(id);
    res.status(200).send({data: answer});
  } catch(err){
    res.status(400).send();
  }
}

const create = async (req, res) => {
  try{
    const answer = await Answer.create(req.body);
    res.status(200).send({data: answer});
  } catch(err){
    res.status(400).send();
  }
}

const update = async (req, res) => {
  try{
    const id = req.params.id;
    const answer = await Answer.update(id, req.body);
    res.status(200).send({data: answer});
  } catch(err){
    res.status(400).send();
  }
}

const remove = async (req, res) => {
  try{
    const id = req.params.id;
    const answer = await Answer.remove(id);
    res.status(200).send({data: answer});
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