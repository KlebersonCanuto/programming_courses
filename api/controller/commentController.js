const { Comment } = require('../database/models');

const create = async (args) => {
  try{
    const { description, DiscussionId } = args;
    const comment = await Comment.create({
      description,
      updated: false,
      DiscussionId
    });  
    return comment;
  } catch(err){
    throw 400;
  }
}

const update = async (id, args) => {
  try{
    const { description, DiscussionId } = args;
    const comment = await Comment.update(
      {       
        description,
        updated: true,
        DiscussionId 
      },
      { where: id }
    );  
    return comment;
  } catch(err){
    throw 400;
  }
}

const remove = async (id) => {
  try{
    const comment = await Comment.destroy(
      { where: id }
    );
    return comment;
  } catch(err){
    throw 400;
  }
}

module.exports = {
  create,
  update,
  remove
};