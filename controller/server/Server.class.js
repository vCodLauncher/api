const pm2 = require('pm2');

class Server {
    constructor() {
        this.serverList = [];
        pm2.connect((err) => {
            if (err) {
                console.error(err);
                process.exit(2);
            }
        });
    }

    heartBeatAllServer() {

    }

    heartBeatSpecificServer() {

    }

    startServer(port, serverType, serverGamemode) {
        let serverModInfo = 'ro';
        let portInfo = port;
        let serverTypeInfo = serverType;
        let serverGamemodeInfo = serverGamemode;

        switch (serverGamemode) {
            case 'sd':
                if (serverType === 'ro') {
                    // ask PortManager for a port

                } else {

                }
                break;
            case 'tdm':

                break;
            case 'dm':

                break;
            case 'ctf':

                break;
            default:

                break;
        }
    }


    stopServer(req, res) {
        let serverId = req.query.serverId;

        pm2.stop(serverId, (err) => {
            if (err) {
                throw err;
            }
            const index = this.serverList.indexOf(serverId);
            if (index !== -1) {
                this.serverList.splice(index, 1);
            }
            res.json({ message: `Server ${serverId} stopped` });
        });
    }

    listServer(req, res) {
        pm2.list((err, processDescription) => {
            if (err) {
                throw err;
            }
            res.json(processDescription);
        });
    }

    serverStatus(req, res) {
        let serverId = req.query.serverId;

        pm2.describe(serverId, (err, processDescription) => {
            if (err) {
                throw err;
            }
            res.json(processDescription);
        });
    }

    killServer(req, res) {
        let serverId = req.query.serverId;

        pm2.delete(serverId, (err) => {
            if (err) {
                throw err;
            }
            const index = this.serverList.indexOf(serverId);
            if (index !== -1) {
                this.serverList.splice(index, 1);
            }
            res.json({ message: `Server ${serverId} killed` });
        });
    }
}

module.exports = Server;
