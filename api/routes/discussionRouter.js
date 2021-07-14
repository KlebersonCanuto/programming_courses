const express = require('express');

const authentication = require('../service/authenticationService');
const service = require('../service/discussionService');

const router = express.Router();

router.get('/', service.getAll);
router.get('/:id', service.get);
router.post('/', authentication.checkUser, service.create);
router.put('/:id', authentication.checkDiscussionOwnerOrAdmin, service.update);
router.delete('/:id', authentication.checkDiscussionOwnerOrAdmin, service.remove);

module.exports = router;