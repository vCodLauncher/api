const {spawn} = require("child_process");
const {Router}  = require("express");
const { verifyToken } = require('../middlewares/VerifyToken');

const router = Router();

router.use(verifyToken);
router.get('/:roomType', (req, res) => {
    console.log('request roomtype')
    let roomType = req.params.roomType;
    if (!(roomType in rooms)) {
        res.status(400).send('Invalid room type');
        return;
    }

    let room = rooms[roomType];

    res.send({ players: room.players });
});

let rooms = {
    'deathmatch': { players: 0, server: null },
    'team-deathmatch': { players: 0, server: null },
}

router.post('/:roomType/join', (req, res) => {
    console.log('Request room join')
    let roomType = req.params.roomType;
    if (!(roomType in rooms)) {
        res.status(400).send('Invalid room type');
        return;
    }

    let room = rooms[roomType];
    room.players += 1;

    if (room.server === null) {
        let port = 25565;
        room.server = spawn('sh', ['start_server.sh', port], { cwd: 'bash_server_manager' });
    }

    res.send({ players: room.players });
});

router.get('/:roomType/leave', (req, res) => {
    let roomType = req.params.roomType;
    if (!(roomType in rooms)) {
        res.status(400).send('Invalid room type');
        return;
    }

    let room = rooms[roomType];
    room.players = Math.max(0, room.players - 1);

    if (room.players === 0 && room.server !== null) {
        room.server.kill('SIGTERM');
        room.server = null;
    }

    res.send({ players: room.players });
});

module.exports = router;