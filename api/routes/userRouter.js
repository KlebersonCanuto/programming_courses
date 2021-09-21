const express = require('express');

const authentication = require('../service/authenticationService');
const service = require('../service/userService');

const router = express.Router();

router.post('/', service.create);
router.get('/ranking', service.ranking);
router.put('/', authentication.checkUser, service.update);
router.get('/', authentication.checkUser, service.get);

module.exports = router;