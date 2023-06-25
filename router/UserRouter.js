const {Router} = require("express");
const {verifyToken} = require("../middlewares/VerifyToken");
const {createUser, getUsers, getUser, updateUser, deleteUser} = require("../controller/user/UserController");
const router = Router();

router.use(verifyToken);

// Create a new user
router.post('/', createUser);
// Get all users
router.get('/', getUsers);
// Get user by id
router.get('/:id', getUser);
// Update user by id
router.patch('/:id', updateUser);
// Delete user by id
router.delete('/:id', deleteUser);

module.exports = router;