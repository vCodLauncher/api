const axios = require("axios");
const { exec } = require("child_process");
const ServerManager = require("../server/Server.class");
const sm = new ServerManager();

class Room {
    constructor(id, maxPlayers) {
        this.id = id;
        this.players = [];
        this.maxPlayers = maxPlayers;
        this.status = 'waiting'; // 'waiting', 'in-progress', 'finished'
    }

    joinRoom(playerName) {
        if (this.players.length < this.maxPlayers) {
            this.players.push(playerName);

            if (this.players.length === 8) {
                this.startGame();
            }

            return true;
        }
        return false;
    }

    leaveRoom(playerName) {
        const index = this.players.indexOf(playerName);
        if (index !== -1) {
            this.players.splice(index, 1);
            return true;
        }
        return false;
    }

    isFull() {
        return this.players.length >= this.maxPlayers;
    }

    startGame() {
        if (this.status === 'waiting' && this.players.length > 1) {
            this.status = 'in-progress';
            // start a server
            // execute client game + connect to server
            console.log("Démarage du serveur");
            sm.startServer('tdm');

            // execute serve
            // exec('echo "hello world"', (error, stdout, stderr) => {
            //     if (error) {
            //         console.log(`error: ${error.message}`);
            //         return;
            //     }
            //     if (stderr) {
            //         console.log(`stderr: ${stderr}`);
            //         return;
            //     }
            //
            //     console.log(`stdout: ${stdout}`);
            // });
        }
    }

    endGame() {
        if (this.status === 'in-progress') {
            this.status = 'finished';
        }
    }
}


module.exports = Room;
