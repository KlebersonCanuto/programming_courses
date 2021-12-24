const express = require('express');

const authentication = require('../service/authenticationService');
const validate = require('../service/validateService');
const service = require('../service/quizService');

const router = express.Router();

router.get('/:id', validate.checkCourseLocked, authentication.getUser, service.getUser);
router.post('/:id', validate.checkCourseLocked, authentication.checkUser, service.submit);
router.get('/hint/:id', validate.checkCourseLocked, authentication.checkUser, service.hint);
router.get('/details/:id', authentication.checkAdmin, service.get);
router.post('/', validate.checkCourseUnlocked, authentication.checkAdmin, service.create);
router.put('/:id', authentication.checkAdmin, service.update);
router.delete('/:id', validate.checkCourseUnlocked, authentication.checkAdmin, service.remove);

module.exports = router;