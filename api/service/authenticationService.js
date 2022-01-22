const Auth = require('../utils/authentication');
const User = require('../controller/userController');
const Logger = require('../utils/logger');

const logger = new Logger('authenticationService');

const checkAdmin = async (req, res, next) => {
  try {
    const id = Auth.getUser(req);
    if(!id) {
      res.status(400).send();
      return;
    }
    logger.debug('checkAdmin', `user id: ${id}`);
    const user = await User.getById(id);
    if(!user.admin){
      res.status(400).send();
      return;
    }
    next();
  } catch (err) {
    logger.error('checkAdmin', err);
    res.status(400).send();
  }
}

const checkUser = async (req, res, next) => {
  try{
    const id = Auth.getUser(req);
    if(!id) {
      res.status(400).send();
      return;
    }
    req.params.userId = id;
    next();
  } catch (err) {
    logger.error('checkUser', err);
    res.status(400).send();
  }
}

const getUser = async (req, _, next) => {
  try {
    const id = Auth.getUser(req);
    if(id) {
      req.params.userId = id;
    }
    next();
  } catch (err) {
    logger.error('getUser', err);
  }
}

module.exports = {
  checkAdmin,
  checkUser,
  getUser
};