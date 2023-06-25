const { Router } = require('express');

const { authUser } = require('../controller/auth');

const router = Router();
// Login a user
router.post('/login', authUser);

module.exports = router;
