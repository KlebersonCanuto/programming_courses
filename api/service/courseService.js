const Course = require('../controller/courseController');

const getAll = async (_, res) => {
  try{
    const courses = await Course.getAll();
    res.status(200).send({data: courses});
  } catch(err){
    res.status(400).send();
  }
}

const get = async (req, res) => {
  try{
    const id = req.params.id;
    const course = await Course.getById(id);
    res.status(200).send({data: course});
  } catch(err){
    res.status(400).send();
  }
}

const validateCourse = (body) => {
  const { name } = body;
  if (!name) {
    throw 400;
  }
}

const create = async (req, res) => {
  try{
    const body = req.body;
    validateCourse(body);
    const course = await Course.create(body);
    res.status(200).send({data: course});
  } catch(err){
    res.status(400).send();
  }
}

const update = async (req, res) => {
  try{
    const id = req.params.id;
    const body = req.body;
    validateCourse(body);
    const course = await Course.update(id, body);
    res.status(200).send({data: course});
  } catch(err){
    res.status(400).send();
  }
}

const remove = async (req, res) => {
  try{
    const id = req.params.id;
    const course = await Course.remove(id);
    res.status(200).send({data: course});
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