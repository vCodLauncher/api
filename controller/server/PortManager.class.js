class PortManager {
    constructor(startPort, endPort) {
        this.availablePorts = Array.from({length: endPort - startPort + 1}, (_, i) => startPort + i);
        this.usedPorts = [28965];
    }

    getAvailablePort() {
        if (this.availablePorts.length === 0) {
            throw new Error('No available ports');
        }

        const port = this.availablePorts.shift();
        this.usedPorts.push(port);
        return port;
    }

    releasePort(port) {
        const index = this.usedPorts.indexOf(port);
        if (index !== -1) {
            this.usedPorts.splice(index, 1);
            this.availablePorts.push(port);
        }
    }
}

module.exports = PortManager;
