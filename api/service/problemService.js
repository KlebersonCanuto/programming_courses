const Problem = require('../controller/problemController');

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
    const problem = await Problem.create(req.body);
    res.status(200).send({data: problem});
  } catch(err){
    res.status(400).send();
  }
}

const update = async (req, res) => {
  try{
    const id = req.params.id;
    const problem = await Problem.update(id, req.body);
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