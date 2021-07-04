const login = require('../utils/login');

const express = require('express');
const router = express.Router();

router.post('/', function(req, res) {
  login.login(req, res);
});

router.get('/', function(req, res) {
  login.isValid(req, res);
});

router.get('/me', function(req, res) {
  login.getData(req, res);
});

module.exports = router;