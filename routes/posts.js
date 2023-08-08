// libraries
import express from 'express'
// model
import { PostModel } from '../models/Post.js'

export const postsRouter = express.Router()


// GET

postsRouter.get('/get-all', async (req, res) => {
    try {
        const posts = await PostModel.find({})
        res.json(posts)
    }
    catch {
        res.json({
            error: "Error! Check your internet connection"
        })
    }
})

postsRouter.get('/get-one/:postId', async (req, res) => {
    const {postId} = req.params;

    try {
        const posts = await PostModel.findById(postId)
        res.json(posts)
    }
    catch {
        res.json({
            error: "Error! Post doesnt exist or bad connection"
        })
    }
})


// POST

postsRouter.post('/add', async (req, res) => {
    const { username, userId, value } = req.body;

    try {
        const currentDate = new Date();
        const options = { 
            weekday: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
        };
        const formattedDate = currentDate.toLocaleDateString('en-US', options).replace(',', '')

        const newPost = new PostModel({
            userId,
            username,
            value,
            date: formattedDate
        })

        newPost.save()

        res.json(newPost)
    }
    catch {
        res.json({
            error: "Unable to add post"
        })
    }
})