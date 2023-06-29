
const allowedPorts = [
    28960,
    28961,
    28962,
    28963,
    28964,
    28965,
    28966,
    28967,
    28968,
    28969,
    28970,
    28971,
    28972,
    28973,
    28974,
    28975,
];

class PortManager {
    constructor() {
        this.usedPorts = [];
    }

    getPort() {
        let port = allowedPorts[Math.floor(Math.random() * allowedPorts.length)];
        if (this.usedPorts.indexOf(port) === -1) {
            this.usedPorts.push(port);
            return port;
        } else {
            return this.getPort();
        }
    }

    releasePort(port) {
        const index = this.usedPorts.indexOf(port);
        if (index !== -1) {
            this.usedPorts.splice(index, 1);
        }
    }
}

module.exports = PortManager;
