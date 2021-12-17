const express = require('express');

const authentication = require('../service/authenticationService');
const service = require('../service/courseService');

const router = express.Router();

router.get('/', authentication.checkUser, service.getAllUser);
router.get('/:id', authentication.checkUser, service.getUser);
router.post('/', authentication.checkAdmin, service.create);
router.put('/:id', authentication.checkAdmin, service.update);
router.delete('/:id', authentication.checkAdmin, service.remove);

module.exports = router;