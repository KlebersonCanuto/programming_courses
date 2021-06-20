const jwt = require("jsonwebtoken");

const auth = (id) => {
  return jwt.sign({id}, process.env.JWTTOKEN, {
    expiresIn: '72h'
  });
}

const getToken = (req) => {
  if(!req.headers || !req.headers.authorization)
    return false;
  const token = req.headers.authorization;
  return token;
}

const getUserByToken = (token) => {
  try {
    let decoded = jwt.verify(token, process.env.JWTTOKEN);
    return decoded.id;
  } catch{
    throw 400;
  }
}

const getUser = (req) => {
  try{
    const token = getToken(req);
    if(token)
      return getUserByToken(token);
    else
      return false;
  } catch(err) {
    throw 400;
  }
}

const isValid = (req) => {
  try{
    const token = getToken(req);
    if(token){
      const id = getUserByToken(token);
      return (id!=='');
    }
    else
      return false;
  } catch(err) {
    throw 400;
  }
}

module.exports = {
  auth,
  getUser,
  isValid,
  getUserByToken
};