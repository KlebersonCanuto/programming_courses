const Discussion = require('../controller/discussionController');

const getAll = async (_, res) => {
  try{
    const discussion = await Discussion.getAll();
    res.status(200).send({data: discussion});
  } catch(err){
    res.status(400).send();
  }
}

const get = async (req, res) => {
  try{
    const id = req.params.id;
    const discussion = await Discussion.getById(id);
    res.status(200).send({data: discussion});
  } catch(err){
    res.status(400).send();
  }
}

const create = async (req, res) => {
  try{
    const discussion = await Discussion.create(req.body);
    res.status(200).send({data: discussion});
  } catch(err){
    res.status(400).send();
  }
}

const update = async (req, res) => {
  try{
    const id = req.params.id;
    const discussion = await Discussion.update(id, req.body);
    res.status(200).send({data: discussion});
  } catch(err){
    res.status(400).send();
  }
}

const remove = async (req, res) => {
  try{
    const id = req.params.id;
    const discussion = await Discussion.remove(id);
    res.status(200).send({data: discussion});
  } catch(err){
    res.status(400).send();
  }
}

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
};