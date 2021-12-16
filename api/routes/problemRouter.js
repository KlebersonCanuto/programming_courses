const express = require('express');
const multer = require('multer');

const authentication = require('../service/authenticationService');
const service = require('../service/problemService');

const router = express.Router();
const upload = multer({
  dest: './tmp/',
});

router.get('/:id', authentication.checkUser, service.getUser);
router.post('/:id', authentication.checkUser, service.submit);
router.post('/oracle/:id', authentication.checkUser, service.oracle);
router.get('/details/:id', authentication.checkAdmin, service.get);
router.post('/', authentication.checkAdmin, upload.single('file'), service.create);
router.put('/:id', authentication.checkAdmin, upload.single('file'), service.update);
router.delete('/:id', authentication.checkAdmin, service.remove);

module.exports = router;