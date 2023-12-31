const express = require("express");
const Room = require('../controller/room/RoomManager.class');
const jsonwebtoken = require("jsonwebtoken");
const { verifyToken } = require("../middlewares/VerifyToken");
const {parse} = require("dotenv");
const maxPlayers = 10;

const router = express.Router();
router.use(verifyToken);

const roomManager = new Room(); // Créez une instance de la classe Room

router.post('/create', async (req, res) => {
    try {
        const room = await roomManager.createRoom(req.body.maxPlayers || maxPlayers);
        res.send({ roomId: room.id });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while creating the room' });
    }
});

router.post('/join/:id', async (req, res) => {
    try {
        const roomId = parseInt(req.params.id);
        const decoded = jsonwebtoken.decode(req.headers.authorization.split(' ')[1]);
        const user = decoded.userWithoutPassword;

        const message = await roomManager.joinRoom(roomId, user.id);
        if (message === 'success') {
            res.send({ message: user.nickname + " Joined the room", roomId: roomId });
        } else {
            res.status(400).send({ message: message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while joining the room' });
    }
});

router.post('/leave', async (req, res) => {
    try {
        const decoded = jsonwebtoken.decode(req.headers.authorization.split(' ')[1]);
        const user = decoded.userWithoutPassword;

        const message = await roomManager.leaveRoom(user.id);
        if (message === 'success') {
            res.send({ message: user.nickname + " left the room" });
        } else {
            res.status(400).send({ message: message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while leaving the room' });
    }
});

router.get('/list', async (req, res) => {
    try {
        const roomList = await roomManager.getRoomList();
        res.send(roomList);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while fetching room list' });
    }
});

router.get('/findRoom', async (req, res) => {
    try {
        const rooms = await roomManager.getRoomList();
        const availableRooms = rooms.filter(room => room.players.length < room.maxPlayers);

        const token = req.headers.authorization.split(' ')[1];
        const decoded = jsonwebtoken.decode(token);
        const userId = parseInt(decoded.userWithoutPassword.id);

        if (isNaN(userId)) {
            return res.status(400).send({ message: 'Invalid user ID' });
        }

        let roomIdToJoin;
        if (availableRooms.length === 0) {
            const newRoom = await roomManager.createRoom(maxPlayers);
            roomIdToJoin = newRoom.id;
            await roomManager.joinRoom(roomIdToJoin, userId);
            res.send({ message: 'No available rooms, created a new room', roomId: roomIdToJoin });
        } else {
            roomIdToJoin = availableRooms[0].id;
            await roomManager.joinRoom(roomIdToJoin, userId);
            res.send({ message: 'Room found and joined', roomId: roomIdToJoin });

            // console log when a player join a room
            const room = await roomManager.getRoomById(roomIdToJoin);
            console.log(room.players[room.players.length - 1].nickname + " joined the room " + roomIdToJoin);

        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const roomId = parseInt(req.params.id);
        if (isNaN(roomId)) {
            return res.status(400).send({ message: 'Invalid Room ID format' });
        }
        const room = await roomManager.getRoomById(roomId);
        res.send(room);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
});


module.exports = router;
