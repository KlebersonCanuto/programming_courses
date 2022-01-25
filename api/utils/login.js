const bcrypt = require('bcrypt');

const auth = require('./authentication');
const User = require('../controller/userController');
const Logger = require('./logger');

const logger = new Logger('login');

const login = async (req, res) => {
  try{
    const { email, password } = req.body;
    logger.debug('login', `user email: ${email}`);
    const user = await User.getByEmail(email);
    const id = user.id;
    const admin = user.admin;
    logger.debug('login', `user id: ${id}`, `admin: ${admin}`);
    
    const same = bcrypt.compareSync(password, user.password);
    if(same){
      const token = auth.auth(id);
      logger.debug('login', `token: ${token}`);
      res.status(200).send({auth: true, token, admin});
    }
    else{
      res.status(302).send({auth: false});
    }
  } catch(err){
    logger.error('login', err);
    res.status(400).send({auth: false});
  }
}

const getData = async (req, res) => {
  try{
    const id = auth.getUser(req);
    logger.debug('getData', `user id: ${id}`);
    const user = await User.getById(id);
    res.status(200).send(user);
  } catch(err){
    logger.error('getData', err);
    res.status(400).send({message: err.message});
  }
}

const isValid = (req, res) => {
  try{
    const valid = auth.isValid(req);
    res.status(200).send({valid});
  } catch(err){
    logger.error('isValid', err);
    res.status(200).send({valid: false});
  }
}

module.exports = {
  login,
  getData,
  isValid
};