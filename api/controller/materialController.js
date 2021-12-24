const { Material, Sequelize } = require('../database/models');

const getById = async (id) => {
  try{
    const material = await Material.findByPk(id, {
      attributes: ['id', 'title', 'content', 'complementary', 'number', 'ModuleId']
    });  
    return material;
  } catch(err){
    throw 400;
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
    throw 400;
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
    throw 400;
  }
}

const create = async (args) => {
  try{
    const { title, content, complementary, number, ModuleId } = args;
    const material = await Material.create({
      title, 
      content, 
      complementary, 
      number, 
      ModuleId
    });  
    return material;
  } catch(err){
    throw 400;
  }
}

const update = async (id, args) => {
  try{
    const { title, content, complementary, number } = args;
    const material = await Material.update(
      {       
        title, 
        content, 
        complementary, 
        number
      },
      { where: { id } }
    );  
    return material;
  } catch(err){
    throw 400;
  }
}

const remove = async (id) => {
  try{
    const material = await Material.destroy(
      { where: { id } }
    );
    return material;
  } catch(err){
    throw 400;
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
    throw 400;
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