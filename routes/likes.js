// libraries
import express from 'express';
//model
import { LikesModel } from '../models/Like.js';

export const likesRouter = express.Router()


// GET

likesRouter.get('/post-likes-count/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        const likesCount = await LikesModel.countDocuments({ postId });

        res.json({
            count: likesCount
        })
    }
    catch {
        res.json({
            error: "Unable to get the likes count"
        })
    }
})

likesRouter.get('/user-liked-posts/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const likedPosts = await LikesModel.find({ userId })
        res.json(likedPosts)
    }
    catch {
        res.json({
            error: "Unalble to load user liked posts"
        })
    }
})


// POST

likesRouter.post('/like', async (req, res) => {
    const { userId, postId } = req.body;

    try {
        const like = await LikesModel.findOne({ userId, postId });

        if (like) {
            await LikesModel.findByIdAndDelete(like._id);
            res.json({
                message: "Disliked successfully"
            });
        } 
        else {
            const newLike = new LikesModel({
                userId,
                postId
            });
            await newLike.save();
            res.json(newLike);
        }
    }
    catch {
        res.json({
            error: "Umabe to like/dislike"
        })
    }
})