const {Router}  = require("express");
const Room = require('../controller/room/RoomManager.class');

const router = Router();

// router.use(verifyToken); à remettre en place quand il y aura la logique d'utilisateur

// router.get('/:roomType', (req, res) => {
//     console.log('request roomtype')
//     let roomType = req.params.roomType;
//     if (!(roomType in rooms)) {
//         res.status(400).send('Invalid room type');
//         return;
//     }
//
//     let room = rooms[roomType];
//
//     res.send({ players: room.players });
// });

let rooms = {};
let serverStatus;
const maxPlayers = 10;

let generateId = () => {
    let response = Math.random().toString(16).slice(2);
    return response;
}

router.post('/create', (req, res) => {
    let id = generateId(); // fonction pour générer un identifiant unique pour la salle
    rooms[id] = new Room(id, maxPlayers);
    res.send(id);
    console.log(id);
})

router.post('/join', (req, res) => {
    let {roomId, playerName} = req.body;
    let room = rooms[roomId];
    if(room && !room.isFull()) {
        room.joinRoom(playerName);
        res.send({message: playerName + " Joined the room", roomId: roomId});
    } else {
        res.status(400).send({message: "Room is full or doesn't exist"});
    }
});

router.post('/leave', (req, res) => {
    const {roomId, playerName} = req.body;
    const room = rooms[roomId];
    if (room) {
        const success = room.leaveRoom(playerName);
        if (success) {
            res.send({message: playerName + " left the room", roomId: roomId});
        } else {
            res.status(400).send({message: playerName + " was not in the room"});
        }
    } else {
        res.status(400).send({message: "Room doesn't exist"});
    }
});

router.get('/list', (req, res) => {
    let roomList = [];
    for(let roomId in rooms) {
        let room = rooms[roomId];
        roomList.push({id: roomId, players: room.players, maxPlayers: room.maxPlayers, status: room.status});
    }
    res.send(roomList);
});

module.exports = router;
