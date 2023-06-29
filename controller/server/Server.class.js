const pm2 = require('pm2');

class Server {
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

    }

    listServer(req, res) {

    }

    serverStatus(req, res) {

    }

    killServer(req, res) {

    }
}

module.exports = Server;
