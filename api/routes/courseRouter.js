const express = require('express');

const authentication = require('../service/authenticationService');
const service = require('../service/courseService');

const router = express.Router();

router.get('/', authentication.getUser, service.getAll);
router.get('/:id', authentication.checkUser, service.getUser);
router.post('/', authentication.checkAdmin, service.create);
router.put('/:id', authentication.checkAdmin, service.update);
router.patch('/:id', authentication.checkAdmin, service.lock);
router.delete('/:id', authentication.checkAdmin, service.remove);

module.exports = router;