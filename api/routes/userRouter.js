const express = require('express');
const router = express.Router();
const User = require('../controller/userController');

router.post('/', async function(req, res) {
  try{
    const user = await User.create(req.body);
    res.status(200).send({data: user});
  } catch(err){
    res.status(400).send();
  }
});

module.exports = router;