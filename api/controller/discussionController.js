const { Discussion, Comment } = require('../database/models');

const getAll = async () => {
  try{
    const discussion = await Discussion.findAll({
      attributes: ["id", "title", "description", "topic"],
    });  
    return discussion;
  } catch(err){
    throw 400;
  }
}


const getById = async (id) => {
  try{
    const discussion = await Discussion.findByPk(id, {
      attributes: ["id", "title", "description", "topic", "CourseId"],
      include: [
        { model: Comment, as: "comments", attributes: ["id", "description"]}
      ]
    });  
    return discussion;
  } catch(err){
    throw 400;
  }
}

const create = async (args) => {
  try{
    const { title, description, topic, CourseId } = args;
    const discussion = await Discussion.create({
      title, 
      description, 
      topic, 
      updated: false, 
      CourseId
    });  
    return discussion;
  } catch(err){
    throw 400;
  }
}

const update = async (id, args) => {
  try{
    const { title, description, topic, CourseId } = args;
    const discussion = await Discussion.update(
      {       
        title, 
        description, 
        topic, 
        updated: true, 
        CourseId 
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
  getAll,
  getById,
  create,
  update,
  remove
};