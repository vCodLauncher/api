const PortManager = require("../server/PortManager.class");
const pm = new PortManager();

const { exec } = require('child_process');

class Server {
    constructor() {

    }

    startServer(gameMode) {
        let server;

        let port = pm.attributePort();

        console.log(port);

        exec('sh ../../bash_server_manager/start_server.sh', (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }

            server = stdout;
            console.log(`stdout: ${stdout}`);
        })

    }

    stopServer() {

    }

    listServer() {

    }

    getServer() {

    }
}

module.exports = Server;
