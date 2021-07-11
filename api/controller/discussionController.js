const { Discussion } = require('../database/models');

const create = async (args) => {
  try{
    const { title, description, topic, updated, course_id } = args;
    const discussion = await Discussion.create({
      title, 
      description, 
      topic, 
      updated, 
      course_id
    });  
    return discussion;
  } catch(err){
    throw 400;
  }
}

const update = async (id, args) => {
  try{
    const { title, description, topic, updated, course_id } = args;
    const discussion = await Discussion.update(
      {       
        title, 
        description, 
        topic, 
        updated, 
        course_id 
      },
      { where: id }
    );  
    return discussion;
  } catch(err){
    throw 400;
  }
}

const remove = async (id) => {
  try{
    const discussion = await Discussion.destroy(
      { where: id }
    );
    return discussion;
  } catch(err){
    throw 400;
  }
}

module.exports = {
  create,
  update,
  remove
};