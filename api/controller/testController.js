const { Test } = require('../database/models');
const Logger = require('../utils/logger');

const logger = new Logger('testController');

const createMany = async (args) => {
  try {
    const tests = await Test.bulkCreate(args, {
      updateOnDuplicate: ['id']
    });  
    return tests;
  } catch (err) {
    logger.error('createMany', err);
    throw 400;
  }
}

const deleteMany = async (args) => {
  try {
    const tests = await Test.destroy(
      { where: { id: args } }
    );
    return tests;
  } catch (err) {
    logger.error('deleteMany', err);
    throw 400;
  }
}

const update = async (id, args) => {
  try {
    const { input, output, example, ProblemId } = args;
    const test = await Test.update(
      {       
        input, 
        output, 
        example, 
        ProblemId 
      },
      { where: { id } }
    );  
    return test;
  } catch (err) {
    logger.error('update', err);
    throw 400;
  }
}

const remove = async (id) => {
  try {
    const test = await Test.destroy(
      { where: { id } }
    );
    return test;
  } catch (err) {
    logger.error('remove', err);
    throw 400;
  }
}

module.exports = {
  createMany,
  deleteMany,
  update,
  remove
};