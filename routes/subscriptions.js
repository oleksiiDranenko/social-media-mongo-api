// libraries
import express from 'express';
// model
import { SubscriptionModel } from '../models/Subscription.js';

export const subscriptionsRouter = express.Router()


// GET 
subscriptionsRouter.get('/is-subscribed', async (req, res) => {
    const { subscriberId, subscribedToId } = req.query;

    if (!subscriberId || !subscribedToId) {
        return res.status(400).json({ message: 'Both subscriberId and subscribedToId are required' });
    }

    try {
        const response = await SubscriptionModel.findOne(
            { subscriber: subscriberId, subscribedTo: subscribedToId }
        );

        if (response) {
            res.status(200).json({
                _id: response._id
            });
        } else {
            res.status(404).json({
                message: "No subscription found"
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


// POST

subscriptionsRouter.post('/subscribe', async (req, res) => {
    const { subscriberId, subscribedToId } = req.body;

    try {
        const newSubscription = new SubscriptionModel({
            subscriber: subscriberId,
            subscribedTo: subscribedToId
        });

        const savedSubscription = await newSubscription.save();

        res.status(201).json(savedSubscription);
    } catch (error) {
        res.status(500).json({
            error: "Unable to subscribe",
            message: error.message
        });
    }
});

