// libraries
import express from 'express';
//model
import { LikesModel } from '../models/Like.js';

export const likesRouter = express.Router()

likesRouter.post('/like', async (req, res) => {
    const { userId, postId } = req.body;

    try {
        const like = await LikesModel.findOne({ userId: userId, postId: postId });

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