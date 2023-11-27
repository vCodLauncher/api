const {Router} = require("express");
const {verifyToken} = require("../middlewares/VerifyToken");
const {createUser, getUsers, getUser, updateUser, deleteUser} = require("../controller/user/UserController");
const router = Router();

router.use(verifyToken);

module.exports = router;