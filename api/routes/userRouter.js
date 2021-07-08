const express = require('express');

const service = require('../service/userService');

const router = express.Router();

router.post('/', service.create);

module.exports = router;