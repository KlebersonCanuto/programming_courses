const express = require('express');

const authentication = require('../service/authenticationService');
const validate = require('../service/validateService');
const service = require('../service/courseService');

const router = express.Router();

router.get('/', authentication.getUser, service.getAll);
router.get('/all', authentication.checkAdmin, service.getAllAdmin);
router.get('/:id', validate.checkCourseLocked, authentication.checkUser, service.getUser);
router.get('/details/:id', authentication.checkAdmin, service.get);
router.post('/', authentication.checkAdmin, service.create);
router.put('/:id', authentication.checkAdmin, service.update);
router.patch('/:id', authentication.checkAdmin, service.lock);
router.delete('/:id', authentication.checkAdmin, service.remove);

module.exports = router;