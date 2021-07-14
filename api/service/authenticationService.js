const Auth = require('../utils/authentication');
const User = require('../controller/userController');

const checkAdmin = async (req, res, next) => {
  const id = Auth.getUser(req);
  if(!id) {
    res.status(400).send();
    return;
  }
  const user = await User.getById(id);
  if(!user.admin){
    res.status(400).send();
    return;
  }
  next();
}

const checkUser = async (req, res, next) => {
  const id = Auth.isValid(req);
  if(!id) {
    res.status(400).send();
    return;
  }
  next();
}

const checkCommentOwnerOrAdmin = async (req, res, next) => {
  const id = Auth.isValid(req);
  if(!id) {
    res.status(400).send();
    return;
  }
  next();
}

const checkDiscussionOwnerOrAdmin = async (req, res, next) => {
  const id = Auth.isValid(req);
  if(!id) {
    res.status(400).send();
    return;
  }
  next();
}

module.exports = {
  checkAdmin,
  checkUser,
  checkCommentOwnerOrAdmin,
  checkDiscussionOwnerOrAdmin
};