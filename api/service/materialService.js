const Material = require('../controller/materialController');
const ProgressService = require('./progressService');

const get = async (req, res) => {
  try{
    const id = req.params.id;
    const material = await Material.getById(id);
    res.status(200).send({data: material});
  } catch(err){
    res.status(400).send();
  }
}

const getUser = async (req, res) => {
  try{
    const id = req.params.id;
    const userId = req.params.userId;
    const material = await Material.getUser(id, userId);
    res.status(200).send({data: material});
  } catch(err){
    res.status(400).send();
  }
}

const done = async (req, res) => {
  try{
    const id = req.params.id;
    const userId = req.params.userId;
    await ProgressService.saveMaterial(id, userId);
    res.status(200).send({data: id});
  } catch(err){
    res.status(400).send();
  }
}

const validateCreate = (body) => {
  const { title, content, complementary, ModuleId } = body;
  if (!title) {
    throw 400;
  }
  if (!content) {
    throw 400;
  }
  if (complementary !== false && complementary !== true) {
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
    const material = await Material.create(body);
    res.status(200).send({data: material});
  } catch(err){
    res.status(400).send();
  }
}

const validateUpdate = (body) => {
  const { title, content, complementary } = body;
  if (!title) {
    throw 400;
  }
  if (!content) {
    throw 400;
  }
  if (complementary !== false && complementary !== true) {
    throw 400;
  }
}

const update = async (req, res) => {
  try{
    const id = req.params.id;
    const body = req.body;
    validateUpdate(body);
    const material = await Material.update(id, body);
    res.status(200).send({data: material});
  } catch(err){
    res.status(400).send();
  }
}

const remove = async (req, res) => {
  try{
    const id = req.params.id;
    const material = await Material.remove(id);
    res.status(200).send({data: material});
  } catch(err){
    res.status(400).send();
  }
}

module.exports = {
  get,
  getUser,
  done,
  create,
  update,
  remove
};