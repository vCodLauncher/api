const { Router } = require('express');
const { requestServer } = require('../controller/server/Server.class');

const router = Router();

router.get('/:serverId', requestServer);

module.exports = router;