const auth = require("./authentication");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = {}; //TODO pegar o user do banco
    const id = user.id;
    const same = bcrypt.compareSync(password, user.password);
    if(same){
      const token = auth.auth(id);
      res.status(200).send({auth: true, token: token});
    }
    else{
      res.status(302).send({auth: false});
    }
  } catch(err){
    res.status(400).send({auth: false});
  }
}

module.exports = {
  login,
};