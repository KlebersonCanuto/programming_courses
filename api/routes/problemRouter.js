const express = require('express');
const multer = require('multer');

const authentication = require('../service/authenticationService');
const validate = require('../service/validateService');
const service = require('../service/problemService');

const router = express.Router();
const upload = multer({
  dest: './tmp/',
});

router.get('/:id', validate.checkCourseLocked, authentication.getUser, service.getUser);
router.post('/code', service.exec);
router.post('/:id', validate.checkCourseLocked, authentication.checkUser, service.submit);
router.post('/oracle/:id', validate.checkCourseLocked, authentication.checkUser, service.oracle);
router.get('/details/:id', authentication.checkAdmin, service.get);
router.post('/', authentication.checkAdmin, upload.array('files', 2), validate.checkCourseUnlocked, service.create);
router.put('/:id', authentication.checkAdmin, upload.array('files', 2), service.update);
router.delete('/:id', validate.checkCourseUnlocked, authentication.checkAdmin, service.remove);

module.exports = router;