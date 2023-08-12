const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Room {
    async createRoom(maxPlayers) {
        try {
            const room = await prisma.room.create({
                data: {
                    maxPlayers: maxPlayers
                }
            });
            return room;
        } catch (error) {
            console.error(error);
            throw new Error('An error occurred while creating the room');
        }
    }

    async joinRoom(roomId, userId) {
        try {
            const room = await prisma.room.findUnique({ where: { id: roomId }, include: { players: true } });
            if (room && room.players.length < room.maxPlayers) {
                await prisma.room.update({
                    where: { id: roomId },
                    data: {
                        players: {
                            connect: { id: userId }
                        }
                    }
                });

                return 'success';
            } else {
                return "Room is full or doesn't exist";
            }
        } catch (error) {
            console.error(error);
            throw new Error('An error occurred while joining the room');
        }
    }

    async leaveRoom(userId) {
        try {
            const user = await prisma.user.findUnique({ where: { id: userId }, include: { Room: true } });
            if (user && user.Room) {
                await prisma.room.update({
                    where: { id: user.Room.id },
                    data: {
                        players: {
                            disconnect: { id: userId }
                        }
                    }
                });
                return 'success';
            } else {
                return "User was not in a room";
            }
        } catch (error) {
            console.error(error);
            throw new Error('An error occurred while leaving the room');
        }
    }

    async getRoomList() {
        try {
            const rooms = await prisma.room.findMany({ include: { players: true } });
            return rooms.map(room => ({
                id: room.id,
                players: room.players,
                maxPlayers: room.maxPlayers,
                status: room.status
            }));
        } catch (error) {
            console.error(error);
            throw new Error('An error occurred while fetching room list');
        }
    }

    //get room by id
    async getRoomById(roomId) {
        try {
            const room = await prisma.room.findUnique({ where: { id: roomId }, include: { players: true } });
            return room;
        } catch (error) {
            console.error(error);
            throw new Error('An error occurred while fetching room list');
        }
    }
}

module.exports = Room;
