const { Problem, Test } = require('../database/models');

const getById = async (id) => {
  try {
    const problem = await Problem.findByPk(id, {
      attributes: ["id", "title", "description"],
      include: [
        { model: Test, as: "tests", attributes: ["id", "input", "output", "example"]},
      ]
    });  
    return problem;
  } catch (err) {
    throw 400;
  }
}

const getFileId = async (id) => {
  try {
    const problem = await Problem.findByPk(id, {
      attributes: ["file_id"],
    });  
    return problem.file_id;
  } catch (err) {
    throw 400;
  }
}

const create = async (args, file_id) => {
  try {
    const { title, description, ModuleId } = args;
    const problem = await Problem.create({
      title, 
      description, 
      file_id,
      ModuleId
    });  
    return problem;
  } catch (err) {
    throw 400;
  }
}

const update = async (id, args, file_id) => {
  try {
    const { title, description } = args;
    let updateAttributes = {
      title, 
      description
    }
    if (file_id) {
      updateAttributes.file_id = file_id;
    }
    const problem = await Problem.update(
      updateAttributes,
      { where: { id } }
    );  
    return problem;
  } catch (err) {
    throw 400;
  }
}

const remove = async (id) => {
  try {
    const problem = await Problem.destroy(
      { where: { id } }
    );
    return problem;
  } catch (err) {
    throw 400;
  }
}

module.exports = {
  getById,
  getFileId,
  create,
  update,
  remove
};