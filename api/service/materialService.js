const Material = require('../controller/materialController');
const ProgressService = require('./progressService');
const Logger = require('../utils/logger');
const Errors = require('../utils/errors');

const logger = new Logger('materialService');

const get = async (req, res) => {
  try{
    const id = req.params.id;
    logger.debug('get', `material id: ${id}`);
    const material = await Material.getById(id);
    res.status(200).send({data: material});
  } catch(err){
    logger.error('get', err);
    res.status(400).send();
  }
}

const getUser = async (req, res) => {
  try{
    const { id, userId } = req.params;
    logger.debug('getUser', `material id: ${id}`, `user id: ${userId}`);
    let material;
    if (userId) {
      material = await Material.getUser(id, userId);
    } else {
      material = await Material.getById(id);;
    }
    res.status(200).send({data: material});
  } catch(err){
    logger.error('getUser', err);
    res.status(400).send();
  }
}

const done = async (req, res) => {
  try{
    const { id, userId } = req.params;
    logger.debug('done', `material id: ${id}`, `user id: ${userId}`);
    await ProgressService.saveMaterial(id, userId);
    res.status(200).send({data: id});
  } catch(err){
    logger.error('done', err);
    res.status(400).send();
  }
}

const validateCreate = (body) => {
  const { title, content, complementary, ModuleId, video_link } = body;
  if (!title) {
    throw Errors.MaterialErrors.INVALID_TITLE;
  }
  if (!content) {
    throw Errors.MaterialErrors.INVALID_CONTENT;
  }
  if (complementary !== false && complementary !== true) {
    throw Errors.MaterialErrors.INVALID_COMPLEMENTARY;
  }
  if (!ModuleId) {
    throw Errors.MaterialErrors.INVALID_MODULE_ID;
  }
  if (!video_link && video_link !== '') {
    throw Errors.MaterialErrors.INVALID_VIDEO_LINK;
  }
}

const create = async (req, res) => {
  try{
    const body = req.body;
    validateCreate(body);
    logger.info('create', `creating material`);
    const material = await Material.create(body);
    res.status(200).send({data: material});
  } catch(err){
    logger.error('create', err);
    res.status(400).send();
  }
}

const validateUpdate = (body) => {
  const { title, content, complementary } = body;
  if (!title) {
    throw Errors.MaterialErrors.INVALID_TITLE;
  }
  if (!content) {
    throw Errors.MaterialErrors.INVALID_CONTENT;
  }
  if (complementary !== false && complementary !== true) {
    throw Errors.MaterialErrors.INVALID_COMPLEMENTARY;
  }
  if (!video_link && video_link !== '') {
    throw Errors.MaterialErrors.INVALID_VIDEO_LINK;
  }
}

const update = async (req, res) => {
  try{
    const id = req.params.id;
    logger.debug('update', `material id: ${id}`);
    const body = req.body;
    validateUpdate(body);
    const material = await Material.update(id, body);
    res.status(200).send({data: material});
  } catch(err){
    logger.error('update', err);
    res.status(400).send();
  }
}

const remove = async (req, res) => {
  try{
    const id = req.params.id;
    logger.debug('remove', `material id: ${id}`);
    const material = await Material.remove(id);
    res.status(200).send({data: material});
  } catch(err){
    logger.error('remove', err);
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