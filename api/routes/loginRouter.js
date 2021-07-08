const express = require('express');

const service = require('../utils/login');

const router = express.Router();

router.post('/', service.login);
router.get('/', service.isValid);
router.get('/me', service.getData);

module.exports = router;