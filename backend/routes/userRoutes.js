const { getUser } = require('../controllers/userController');
const router = require('express').Router();

router.get("/:id", getUser);

module.exports = router;