const Course = require('../controller/courseController');
const ProgressService = require('./progressService');

const getAll = async (_, res) => {
  try{
    const courses = await Course.getAll();
    res.status(200).send({data: courses});
  } catch(err){
    res.status(400).send();
  }
}

const generateResponseGet = (course, doneModules) => {
  const doneModulesId = doneModules.map(e => e.ModuleId);
  const modules = course.modules.map(module => {
    return {
      ...module.dataValues,
      done: doneModulesId.includes(module.id)
    }
  });

  return {
    name: course.name,
    done: course.done,
    modules,
  };
}

const getUser = async (req, res) => {
  try{
    const { id, userId } = req.params;
    const course = await Course.getUser(id, userId);
    const doneModules = await ProgressService.getDoneModules(id, userId);
    const response = generateResponseGet(course, doneModules);
    res.status(200).send({data: response});
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
  getUser,
  create,
  update,
  remove
};