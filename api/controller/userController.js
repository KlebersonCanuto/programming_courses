const bcrypt = require('bcrypt');

const { User } = require('../database/models');
const Logger = require('../utils/logger');
const Errors = require('../utils/errors');

const logger = new Logger('userController');

const create = async (args) => {
  try{
    const { username, password, confirmPassword, email, profileImageURL } = args;
    if(password === confirmPassword){
      const hash = bcrypt.hashSync(password, Number(process.env.HASH));

      const user = await User.create({
        username,
        email: email.toLowerCase(),
        password: hash,
        profileImageURL,
      });
      
      user.password = undefined;
      return user;
    } else {
      throw Errors.UserErrors.PASSWORD_DONT_MATCH;
    }
  } catch(err){
    logger.error('create', err);
    throw Errors.UserErrors.FAILED_TO_CREATE_USER;
  }
}

const update = async (id, args) => {
  try{
    const { username } = args;
    const user = await User.update(
      { username },
      { where: { id } }
    );  
    return user;
  } catch(err){
    logger.error('update', err);
    throw Errors.UserErrors.FAILED_TO_UPDATE_USER;
  }
}

const getByEmail = async (email) => {
  try{
    const user = await User.findOne({ where: { email } });
    return user;
  } catch(err){
    logger.error('getByEmail', err);
    throw Errors.UserErrors.FAILED_TO_GET_USER;
  }
}

const getById = async (id) => {
  try{
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    return user;
  } catch(err){
    logger.error('getById', err);
    throw Errors.UserErrors.FAILED_TO_GET_USER;
  }
}

module.exports = {
  getById,
  getByEmail,
  create,
  update
};