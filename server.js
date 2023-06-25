
const express = require('express')
const { spawn } = require('child_process')
const cors = require('cors')

const app = express()
app.use(cors())
const port = process.env.PORT || 3000

const authRouter = require('./router/AuthRouter');
const executeRouter = require('./router/ExecuteRouter');
const roomRouter = require('./router/RoomRouter');
const userRouter = require('./router/UserRouter');


app.use(express.json());
app.use('/auth', authRouter);
app.use('/execute', executeRouter);
app.use('/room', roomRouter);
app.use('/user', userRouter);
app.listen(port, () => {
    console.log(`API démarrée sur http://localhost:${port}`)
});


// http://193.38.250.89:3000/execute?port=28965