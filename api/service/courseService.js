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

const create = async (req, res) => {
  try{
    const course = await Course.create(req.body);
    res.status(200).send({data: course});
  } catch(err){
    res.status(400).send();
  }
}

const update = async (req, res) => {
  try{
    const id = req.params.id;
    const course = await Course.update(id, req.body);
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