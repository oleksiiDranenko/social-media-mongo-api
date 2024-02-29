// libraries
import express from 'express';
// model
import { CommentModel } from '../models/Comment.js';

export const commentsRouter = express.Router()


// GET

commentsRouter.get('/get-comments/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await CommentModel.find({ postId })

        res.json(comments)
    }
    catch {
        res.json({
            error: "Unable to load the comments"
        })
    }
})

commentsRouter.get('/get-comments-count/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        const commentsCount = await CommentModel.countDocuments({postId})

        res.json(commentsCount)
    } catch {
        res.json({
            error: "Unable to load the comments count"
        })
    }
})


// POST 

commentsRouter.post('/add', async (req, res) => {
    const { username, avatar, userId, postId, value } = req.body;

    try{
        const currentDate = new Date();
        const options = { 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
        };
        const formattedDate = currentDate.toLocaleDateString('en-US', options).replace(',', '')

        const comment = new CommentModel({
            username,
            avatar,
            userId,
            postId,
            value,
            date: formattedDate
        })

        await comment.save()

        res.json(comment)
    }
    catch {
        res.json({
            error: "Unable to comment"
        })
    }
})


// DELETE

commentsRouter.delete('/delete/:commentId', async (req, res) => {
    const { commentId } = req.params;

    try {
        await CommentModel.findByIdAndDelete(commentId)

        res.json({
            message: "Comment was deleted successfully"
        })
    }
    catch {
        res.json({
            error: "Unable to delete comment"
        })
    }
})