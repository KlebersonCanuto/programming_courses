const express = require('express');

const authentication = require('../service/authenticationService');
const service = require('../service/commentService');

const router = express.Router();

router.post('/', authentication.checkUser, service.create);
router.put('/:id', authentication.checkCommentOwnerOrAdmin, service.update);
router.delete('/:id', authentication.checkCommentOwnerOrAdmin, service.remove);

module.exports = router;