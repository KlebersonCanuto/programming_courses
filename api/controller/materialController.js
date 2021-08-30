const { Material } = require('../database/models');

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
    const { title, content, complementary, number, ModuleId } = args;
    const material = await Material.update(
      {       
        title, 
        content, 
        complementary, 
        number, 
        ModuleId 
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

module.exports = {
  getById,
  create,
  update,
  remove
};