const express = require("express");
const Room = require('../controller/room/RoomManager.class');
const jsonwebtoken = require("jsonwebtoken");
const { verifyToken } = require("../middlewares/VerifyToken");
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

router.post('/join', async (req, res) => {
    try {
        const { roomId } = req.body;
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

module.exports = router;
