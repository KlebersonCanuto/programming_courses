const express = require('express');

const authentication = require('../service/authenticationService');
const service = require('../service/materialService');

const router = express.Router();

router.get('/:id', service.get);
router.get('/details/:id', authentication.checkAdmin, service.get);
router.post('/:id', authentication.checkUser, service.done);
router.post('/', authentication.checkAdmin, service.create);
router.put('/:id', authentication.checkAdmin, service.update);
router.delete('/:id', authentication.checkAdmin, service.remove);

module.exports = router;