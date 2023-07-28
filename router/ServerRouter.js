const { Router } = require('express');
const PortManager = require("../controller/server/PortManager.class");
const ServerManager = require("../controller/server/Server.class");
const pm = new PortManager();
const sm = new ServerManager();

const router = Router();

router.get('/all', (req, res) => {

});

router.post('/start', (req, res) => {
    console.log('start server')
    let port = 28960;
    let serverType = 'cod-1.5'
    let serverGamemode = 'sd'
    let serverMod = 'ro'

    sm.startServer(port, serverType, serverGamemode, serverMod);
    res.send({ port });
});

router.post('/attributePort/:port', (req, res) => {
    try {
        const port = parseInt(req.params.port, 10);
        pm.attributePort(port); // Vous aurez besoin d'une méthode qui prend un port en argument
        res.json({ port });
    } catch (err) {
        res.status(500).send({ error: 'Could not attribute port' });
    }
    // http://localhost:3000/server/attributePort/:port
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

router.get('/usedPorts', (req, res) => {
    const used = pm.getUsedPorts();
    res.json({ used });
});

router.get('/freePorts', (req, res) => {
    const free = pm.getFreePorts();
    res.json({ free });
});

router.get('/:id', (req, res) => {
    res.json({ message: `Server ${req.params.id}` });
});

module.exports = router;
