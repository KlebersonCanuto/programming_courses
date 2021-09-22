const Module = require('../controller/moduleController');

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
  create,
  update,
  remove
};