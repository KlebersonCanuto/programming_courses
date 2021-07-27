const Module = require('../controller/moduleController');

const get = async (req, res) => {
  try{
    const id = req.params.id;
    const course = await Module.getById(id);
    res.status(200).send({data: course});
  } catch(err){
    res.status(400).send();
  }
}

const create = async (req, res) => {
  try{
    const course = await Module.create(req.body);
    res.status(200).send({data: course});
  } catch(err){
    res.status(400).send();
  }
}

const update = async (req, res) => {
  try{
    const id = req.params.id;
    const course = await Module.update(id, req.body);
    res.status(200).send({data: course});
  } catch(err){
    res.status(400).send();
  }
}

const remove = async (req, res) => {
  try{
    const id = req.params.id;
    const course = await Module.remove(id);
    res.status(200).send({data: course});
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