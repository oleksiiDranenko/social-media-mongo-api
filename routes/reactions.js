// libraries
import express from 'express';
//model
import { ReactionsModel } from '../models/Reaction.js';

export const reactionsRouter = express.Router()


// GET

reactionsRouter.get('/get-reactions/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        const reactions = await ReactionsModel.find({ postId });

        res.json({
            reactions
        })
    }
    catch {
        res.json({
            error: "Unable to get the reactions"
        })
    }
})



// POST

reactionsRouter.post('/react', async (req, res) => {
    const { userId, postId, reactionId } = req.body;

    try {
        const reaction = await ReactionsModel.findOne({ userId, postId, reactionId });

        if (reaction) {
            await ReactionsModel.findByIdAndDelete(reaction._id);
            res.json({
                message: "Reaction removed successfully"
            });
        } 
        else {
            // delete other reactions on the same post
            await ReactionsModel.findOneAndDelete({ userId, postId })

            const newReaction = new ReactionsModel({
                userId,
                postId,
                reactionId
            });
            await newReaction.save();
            res.json(newReaction);
        }
    }
    catch {
        res.json({
            error: "Unable to react/remove reaction"
        })
    }
})