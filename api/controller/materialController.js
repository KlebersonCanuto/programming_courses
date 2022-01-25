const { Material, Sequelize } = require('../database/models');
const Logger = require('../utils/logger');
const Errors = require('../utils/errors');

const logger = new Logger('materialController');

const getById = async (id) => {
  try{
    const material = await Material.findByPk(id, {
      attributes: ['id', 'title', 'content', 'complementary', 'number', 'video_link', 'ModuleId']
    });  
    return material;
  } catch(err){
    logger.error('getById', err);
    throw Errors.MaterialErrors.FAILED_TO_GET_MATERIAL;
  }
}

const getUser = async (id, userId) => {
  try{
    const quiz = await Material.findByPk(id, {
      attributes: {
        include: [
          'id', 'title', 'content', 'complementary', 'number', 'ModuleId',
          Sequelize.literal(`(
            SELECT COUNT(*) > 0
            FROM MaterialUsers
            WHERE
                material_id = ${id}
                AND
                user_id = ${userId}
                AND
                done = true
          ) AS done`)
        ],
        exclude: ['createdAt', 'updatedAt']
      }
    });  
    return quiz;
  } catch(err){
    logger.error('getUser', err);
    throw Errors.MaterialErrors.FAILED_TO_GET_MATERIAL;
  }
}

const getNotComplementary = async (ModuleId) => {
  try{
    const materials = await Material.findAll({ 
      where: { ModuleId, complementary: false }, 
      attributes: ['id'] 
    });  
    return materials;
  } catch(err){
    logger.error('getNotComplementary', err);
    throw Errors.MaterialErrors.FAILED_TO_GET_MATERIAL;
  }
}

const create = async (args) => {
  try{
    const { title, content, complementary, number, video_link, ModuleId } = args;
    const material = await Material.create({
      title, 
      content, 
      complementary, 
      number, 
      video_link,
      ModuleId
    });  
    return material;
  } catch(err){
    logger.error('create', err);
    throw Errors.MaterialErrors.FAILED_TO_CREATE_MATERIAL;
  }
}

const update = async (id, args) => {
  try{
    const { title, content, complementary, video_link, number } = args;
    const material = await Material.update(
      {       
        title, 
        content, 
        complementary, 
        number,
        video_link
      },
      { where: { id } }
    );  
    return material;
  } catch(err){
    logger.error('update', err);
    throw Errors.MaterialErrors.FAILED_TO_UPDATE_MATERIAL;
  }
}

const remove = async (id) => {
  try{
    const material = await Material.destroy(
      { where: { id } }
    );
    return material;
  } catch(err){
    logger.error('remove', err);
    throw Errors.MaterialErrors.FAILED_TO_REMOVE_MATERIAL;
  }
}

const checkCourseLocked = async (id) => {
  try{
    const material = await Material.findByPk(id, {
      attributes: [
        Sequelize.literal(`(
          SELECT locked
          FROM Courses
          WHERE
              id = (
                SELECT course_id 
                FROM Modules
                WHERE
                  id = module_id
              )
        ) AS locked`),
      ]
    });  
    return material.locked;
  } catch(err){
    logger.error('checkCourseLocked', err);
    throw Errors.MaterialErrors.FAILED_TO_CHECK_COURSE_LOCKED;
  }
}

module.exports = {
  getById,
  getUser,
  getNotComplementary,
  create,
  update,
  remove,
  checkCourseLocked
};