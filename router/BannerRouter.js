const { Router } = require('express');
const { getBanner } = require('../controller/cosmetics/banner/BannerController')

const {verifyToken} = require("../middlewares/VerifyToken");


const router = Router();

router.use(verifyToken);

router.get('/:id', getBanner);

module.exports = router;