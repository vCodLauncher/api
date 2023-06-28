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

    startServer(req, res) {
        let port = req.query.port;
        let serverType = req.query.serverType;
        let serverGamemode = req.query.serverGamemode;

        pm2.start({
            name: `cod-server-${port}`,
            script: 'sh',
            args: ['start_server.sh', port, serverType, serverGamemode],
            cwd: 'bash_server_manager'
        }, (err, apps) => {
            if (err) {
                throw err;
            }
            this.serverList.push(apps[0].pm2_env.pm_id);
            res.json({ message: `Server started on port ${port}` });
        });
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
