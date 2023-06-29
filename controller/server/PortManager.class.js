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

const usedPorts = [];

class PortManager {
    attributePort() {
        for (let port of allowedPorts) {
            if (!usedPorts.includes(port)) {
                usedPorts.push(port);
                return port;
            }
        }
        throw new Error("No available ports"); // Lance une erreur si aucun port n'est disponible
    }

    releasePort(port) {
        const index = usedPorts.indexOf(port);
        if (index > -1) {
            usedPorts.splice(index, 1);
        }
    }

    isPortInUse(port) {
        return usedPorts.includes(port); // Retourne true si le port est utilisé, false sinon
    }
}

module.exports = PortManager;
