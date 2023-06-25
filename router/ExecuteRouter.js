const { spawn} =  require("child_process");
const {Router} = require("express");
const { verifyToken } = require("../middlewares/VerifyToken");

const router = Router();

router.use(verifyToken);
router.get('/', (req, res) => {
    console.log('appel route')
    let port = req.query.port;  // Récupère le port depuis les paramètres de la requête
    let child = spawn('sh', ['start_server.sh', port], { cwd: 'bash_server_manager' })

    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
    })

    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`)
    })

    child.on('error', (error) => {
        console.error(`error: ${error.message}`)
    })

    child.on('exit', (code, signal) => {
        if (code) console.log(`Process exited with code ${code}`)
        if (signal) console.log(`Process was killed with signal ${signal}`)
    })
})

module.exports = router;