const axios= require('axios');

const baseUrl = 'https://master.codlauncher.net';

const requestServer = async (req, res) => {
    const { serverId } = req.params;

    try {
        const response = await axios.get(`${baseUrl}/server/get`);
        const serverDetails = response.data;
        console.log('debug');

        res.json(serverDetails);
    } catch (error) {
        console.error('Error requesting server:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { requestServer };
