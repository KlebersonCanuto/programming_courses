const express = require('express');

const authentication = require('../service/authenticationService');
const service = require('../service/testService');

const router = express.Router();

router.delete('/:id', authentication.checkAdmin, service.remove);

module.exports = router;