const { Router } = require('express');

const { authUser, getMe} = require('../controller/auth');

const router = Router();

module.exports = router;