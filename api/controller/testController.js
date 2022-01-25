const { Test } = require('../database/models');
const Logger = require('../utils/logger');
const Errors = require('../utils/errors');

const logger = new Logger('testController');

const createMany = async (args) => {
  try {
    const tests = await Test.bulkCreate(args, {
      updateOnDuplicate: ['id']
    });  
    return tests;
  } catch (err) {
    logger.error('createMany', err);
    throw Errors.TestErrors.FAILED_TO_CREATE_MANY_TESTS;
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
    throw Errors.TestErrors.FAILED_TO_DELETE_MANY_TESTS;
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
    throw Errors.TestErrors.FAILED_TO_UPDATE_TEST;
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
    throw Errors.TestErrors.FAILED_TO_REMOVE_TEST;
  }
}

module.exports = {
  createMany,
  deleteMany,
  update,
  remove
};