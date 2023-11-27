const { authUser, getMe} = require('../controller/auth');

const router = Router();
// Login a user
router.post('/login', authUser);

router.get('/me', getMe);

module.exports = router;
