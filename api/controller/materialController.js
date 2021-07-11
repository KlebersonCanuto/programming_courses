const { Material } = require('../database/models');

const create = async (args) => {
  try{
    const { title, content, complementary, number, module_id } = args;
    const material = await Material.create({
      title, 
      content, 
      complementary, 
      number, 
      module_id
    });  
    return material;
  } catch(err){
    throw 400;
  }
}

const update = async (id, args) => {
  try{
    const { title, content, complementary, number, module_id } = args;
    const material = await Material.update(
      {       
        title, 
        content, 
        complementary, 
        number, 
        module_id 
      },
      { where: id }
    );  
    return material;
  } catch(err){
    throw 400;
  }
}

const remove = async (id) => {
  try{
    const material = await Material.destroy(
      { where: id }
    );
    return material;
  } catch(err){
    throw 400;
  }
}

module.exports = {
  create,
  update,
  remove
};