const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
const port = process.env.PORT || 3002

const authRouter = require('./router/AuthRouter');
const roomRouter = require('./router/RoomRouter');
const userRouter = require('./router/UserRouter');
const bannerRouter = require('./router/BannerRouter');
const requestServer = require('./router/ServerRouter');

app.use(express.json());
app.use('/auth', authRouter);
app.use('/room', roomRouter);
app.use('/user', userRouter);
app.use('/server', requestServer);
app.use('/banner', bannerRouter);

app.use('/bannerURL', express.static("cosmetics/assets/banner"));

app.listen(port, () => {
    console.log(`API démarrée sur http://localhost:${port}`)
});
