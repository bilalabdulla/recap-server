require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const ImageModel = require('./models/Image')

const authenticateUser = require('./middlewares/authentication')
const imageUpload = require('./middlewares/imageUpload')

const cors = require('cors')
const connectDB = require('./db/connect')

const authRouter = require('./routes/auth')
const postRouter = require('./routes/posts')
const userRouter = require('./routes/users')
const commentRouter = require('./routes/comments')
const followRouter = require('./routes/follow')
const likesRouter = require('./routes/likes')
const profileRouter = require('./routes/profiles')
const imagesRouter = require('./routes/images')
const chatsRouter = require('./routes/chats')

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/posts', imageUpload.single('file'), postRouter)
app.use('/api/v1/users', authenticateUser, imageUpload.single('file'), userRouter)
app.use('/api/v1', likesRouter)
app.use('/api/v1/comments', commentRouter)
app.use('/api/v1/follow', followRouter)
app.use('/api/v1/profile', imageUpload.single('file'), profileRouter)
app.use('/api/v1/images', imageUpload.single('file'), imagesRouter)
app.use('/api/v1/chats', authenticateUser, chatsRouter)

app.get('/', (req, res) => {
    res.status(200).json({ message: "nice"})
})

const port = process.env.PORT || 9000

const start = async () => {
    try {   
            await connectDB(process.env.MONGO_URI)
            app.listen(port, () => {
            console.log(`server is listening on ${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}

start()

