const { Problem, Test, Sequelize } = require('../database/models');

const getById = async (id) => {
  try {
    const problem = await Problem.findByPk(id, {
      attributes: ['id', 'title', 'description', 'ModuleId'],
      include: [
        { model: Test, as: 'tests', attributes: ['id', 'input', 'output', 'example', 'image_link']},
      ]
    });  
    return problem;
  } catch (err) {
    throw 400;
  }
}

const getByModule = async (ModuleId) => {
  try{
    const problems = await Problem.findAll({ 
      where: { ModuleId },
      attributes: ['id'] 
    });  
    return problems;
  } catch(err){
    throw 400;
  }
}

const getUser = async (id, userId) => {
  try {
    const problem = await Problem.findByPk(id, {
      attributes: {
        include: [
          Sequelize.literal(`(
            SELECT COUNT(*) > 0
            FROM ProblemUsers
            WHERE
                problem_id = ${id}
                AND
                user_id = ${userId}
                AND
                done=true 
          ) AS done`)
        ],
        exclude: ['file_id', 'createdAt', 'updatedAt']
      },
      include: [
        { model: Test, as: 'tests', attributes: ['input', 'output'], where: { example: true }},
      ]
    });  
    return problem;
  } catch (err) {
    throw 400;
  }
}

const getWithoutTests = async (id) => {
  try {
    const problem = await Problem.findByPk(id, {
      attributes: ['id', 'title', 'image_link', 'description', 'ModuleId'],
      include: [
        { model: Test, as: 'tests', attributes: ['input', 'output'], where: { example: true }},
      ]
    });  
    return problem;
  } catch (err) {
    throw 400;
  }
}

const getTests = async (id) => {
  try {
    const problem = await Problem.findByPk(id, {
      include: [
        { model: Test, as: 'tests', attributes: ['input', 'output'] },
      ]
    });  
    return problem.tests;
  } catch (err) {
    throw 400;
  }
}

const getFileId = async (id) => {
  try {
    const problem = await Problem.findByPk(id, {
      attributes: ['file_id'],
    });  
    return problem.file_id;
  } catch (err) {
    throw 400;
  }
}

const create = async (args, file_id, image_link) => {
  try {
    const { title, description, ModuleId } = args;
    const problem = await Problem.create({
      title, 
      description, 
      file_id,
      image_link,
      ModuleId
    });  
    return problem;
  } catch (err) {
    throw 400;
  }
}

const update = async (id, args, file_id, image_link) => {
  try {
    const { title, description } = args;
    let updateAttributes = {
      title, 
      description
    }
    if (file_id) {
      updateAttributes.file_id = file_id;
    }
    if (image_link) {
      updateAttributes.image_link = image_link;
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

const checkCourseLocked = async (id) => {
  try{
    const problem = await Problem.findByPk(id, {
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
    return problem.locked;
  } catch(err){
    throw 400;
  }
}

module.exports = {
  getById,
  getUser,
  getTests,
  getWithoutTests,
  getFileId,
  getByModule,
  create,
  update,
  remove,
  checkCourseLocked
};