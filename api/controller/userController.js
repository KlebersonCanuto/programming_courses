const bcrypt = require('bcrypt');

const { User } = require('../database/models');

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
      throw 400;
    }
  } catch(err){
    throw 400;
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
    throw 400;
  }
}

const getByEmail = async (email) => {
  try{
    const user = await User.findOne({ where: { email } });
    return user;
  } catch(err){
    throw 400;
  }
}

const getById = async (id) => {
  try{
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    return user;
  } catch(err){
    throw 400;
  }
}

module.exports = {
  getById,
  getByEmail,
  create,
  update
};