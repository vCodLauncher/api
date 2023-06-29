const { Router } = require('express');

const router = Router();

router.get('/server/all', (req, res) => {

});

router.get('/server/:id', (req, res) => {
    res.json({ message: `Server ${req.params.id}` });
});

router.get('/server/start', (req, res) => {
    let port = 28960;
    let serverType = 'cod-1.5'
    let serverGamemode = 'sd'
    let serverMod = 'ro'


})



module.exports = router;
