// comment

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Auth
import register from './routes/auth/register.js'
import login from './routes/auth/login.js'
import logout from './routes/auth/logout.js'
import load_user from './routes/auth/load_user.js'

// Social
import follow_user from './routes/social/follow_user.js'
import create_post from './routes/feed/create_post.js'
import get_posts from './routes/feed/get_posts.js'
import giphy_search from './routes/feed/giphy_search.js'
import giphy_trending from './routes/feed/giphy_trending.js'
import get_profile from './routes/social/get_profile.js'
import online_users from './routes/social/online_users.js'
import upvote_post from './routes/feed/upvote_post.js'
import downvote_post from './routes/feed/downvote_post.js'
import edit_post from './routes/feed/edit_post.js'
import delete_post from './routes/feed/delete_post.js'

// Profile
import edit_profile from './routes/profile/edit_profile.js'

// Sockets
import { Server } from 'socket.io'
import newConnection from './sockets/handlers/new_connection.js'

// Middleware
import tracker from './middleware/tracker.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(tracker)

// Routes
app.use('/api/auth/register', register)
app.use('/api/auth/login', login)
app.use('/api/auth/logout', logout)
app.use('/api/auth/load_user', load_user)

app.use('/api/social/follow_user', follow_user)
app.use('/api/social/get_profile', get_profile)
app.use('/api/social/online_users', online_users)

app.use('/api/feed/create_post', create_post)
app.use('/api/feed/get_posts', get_posts)
app.use('/api/feed/giphy_search', giphy_search)
app.use('/api/feed/giphy_trending', giphy_trending)
app.use('/api/feed/upvote_post', upvote_post)
app.use('/api/feed/downvote_post', downvote_post)
app.use('/api/feed/edit_post', edit_post)
app.use('/api/feed/delete_post', delete_post)

app.use('/api/profile/edit_profile', edit_profile)

// Default Route
app.get('/', (req, res) => {
    res.send('Hello TalkToBeavs!')
})
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('[Backend ⚡️]: Connected to MongoDB')
    })
    .catch((err) => {
        console.log(err)
    })

const server = app.listen(PORT, () => {
    console.log(`[Backend ⚡️]: Server is running on port ${PORT}`)
})

const io = new Server(server, {
    cors: {
        origin: '*',
    },
})

io.on('connection', (socket) => {
    newConnection(socket, io)
})
