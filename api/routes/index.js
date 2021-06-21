const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send({text: "test"});
});

module.exports = router;