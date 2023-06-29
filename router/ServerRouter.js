const { Router } = require('express');
const PortManager = require("../controller/server/PortManager.class");
const pm = new PortManager();

const router = Router();

router.get('/all', (req, res) => {

});

router.get('/:id', (req, res) => {
    res.json({ message: `Server ${req.params.id}` });
});

router.get('/start', (req, res) => {
    let port = 28960;
    let serverType = 'cod-1.5'
    let serverGamemode = 'sd'
    let serverMod = 'ro'
})

router.post('/attributePort', (req, res) => {
    try {
        const attributedPort = pm.attributePort(); // Utilisez pm directement
        res.json({ port: attributedPort });
    } catch (err) {
        res.status(500).send({ error: 'No available ports' });
    }

    // http://localhost:3000/server/attributePort
});

router.get('/isPortInUse/:port', (req, res) => {
    const port = parseInt(req.params.port, 10);
    const inUse = pm.isPortInUse(port);
    res.json({ port, inUse });

    // http://localhost:3000/server/isPortInuse/:?
});

router.delete('/releasePort/:port', (req, res) => {
    const port = parseInt(req.params.port, 10);
    pm.releasePort(port);
    res.json({ port, message: 'Port has been released' });

    // http://localhost:3000/server/releasePort/:?
});
module.exports = router;
