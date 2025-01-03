// libraries
import express from 'express'
// model
import { PostModel } from '../models/Post.js'
import { CommentModel } from '../models/Comment.js'
import { ReactionsModel } from '../models/Reaction.js'

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

postsRouter.get('/get-user-posts/:userId', async (req, res) => {
    const {userId} = req.params;

    try {
        const posts = await PostModel.find({userId})
        res.json(posts)
    }
    catch {
        res.json({
            error: "Error! Check your internet connection"
        })
    }
})

postsRouter.get('/get-user-posts-num/:userId', async (req, res) => {
    const {userId} = req.params;

    try {
        const posts = await PostModel.count({userId})
        res.json({
            postsNum: posts
        })
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
    const { username, userAvatar, userId, value, img } = req.body;

    try {
        const currentDate = new Date();
        const options = { 
            day: 'numeric', 
            month: 'short',    
            hour: '2-digit',
            minute: '2-digit',  
            hour12: false
        };

        const formattedDate = currentDate.toLocaleString('en-US', options).replace(',', '');

        if (img) {
            const newPost = new PostModel({
                userId,
                username,
                userAvatar,
                value,
                img,
                date: formattedDate,
                edited: false
            })
    
            await newPost.save()
            res.json(newPost)
        } else {
            const newPost = new PostModel({
                userId,
                username,
                userAvatar,
                value,
                date: formattedDate,
                edited: false
            })
    
            newPost.save()
            res.json(newPost)
        }
    }
    catch {
        res.json({
            error: "Unable to add post"
        })
    }
})


// PATCH

postsRouter.patch('/edit/:postId', async (req, res) => {
    const { postId } = req.params;
    const { value } = req.body;

    try {
        const post = await PostModel.findById(postId)
        post.value = value;

        if (!post.edited) post.edited = true;
        
        await post.save()
        res.json(post)
    }
    catch {
        res.json({
            error: "Unable to edit the post"
        })
    }
})


// DELETE

postsRouter.delete('/delete/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        await PostModel.findByIdAndDelete(postId)
        await CommentModel.find({postId}).deleteMany()
        await ReactionsModel.find({postId}).deleteMany()

        res.json({
            message: "Post was successfully deleted"
        })
    }
    catch {
        res.json({
            error: "Unable to delete the post"
        })
    }
})