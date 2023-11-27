const { authUser, getMe} = require('../controller/auth');
const express = require('express');


const router = express.Router();
// Login a user
router.post('/login', authUser);

router.get('/me', getMe);

module.exports = router;
