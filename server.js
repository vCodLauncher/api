const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
const port = process.env.PORT || 3000

const authRouter = require('./router/AuthRouter');
const roomRouter = require('./router/RoomRouter');
const userRouter = require('./router/UserRouter');
const serverRouter = require('./router/ServerRouter');
const bannerRouter = require('./router/BannerRouter');

app.use(express.json());
app.use('/auth', authRouter);
app.use('/room', roomRouter);
app.use('/user', userRouter);
app.use('/server', serverRouter);
app.use('/banner', bannerRouter);

app.use('/bannerURL', express.static("cosmetics/assets/banner"));

app.use

app.listen(port, () => {
    console.log(`API démarrée sur http://localhost:${port}`)
});

// http://193.38.250.89:3000/execute?port=28965
