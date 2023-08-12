const { Router } = require('express');
const {getBannerById} = require('../controller/cosmetics/banner/BannerController.class')

const { authUser, getMe} = require('../controller/auth');

const router = Router();

router.get('/:id', getBannerById);

module.exports = router;