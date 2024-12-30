// libraries
import express from 'express';
import mongoose from 'mongoose';
// model
import { SubscriptionModel } from '../models/Subscription.js';
import { UserModel } from '../models/User.js';

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

//

subscriptionsRouter.get('/get-subscriptions-to/:subscriberId', async (req, res) => {
    const { subscriberId } = req.params;

    try {
        const subscriptions = await SubscriptionModel.find({ subscriber: subscriberId });

        const subscribedToIds = subscriptions
            .map(sub => sub.subscribedTo)
            .filter(mongoose.Types.ObjectId.isValid); 


        const users = await UserModel.find({ _id: { $in: subscribedToIds } });

        res.json(users); 

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

subscriptionsRouter.get('/get-subscriptions-to-num/:subscriberId', async (req, res) => {
    const { subscriberId } = req.params;

    try {
        const subscriptionsNum = await SubscriptionModel.countDocuments({ subscriber: subscriberId });

        res.json({
            subNum: subscriptionsNum 
        });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Unable to fetch subscription count" });
    }
});


//


subscriptionsRouter.get('/get-subscribers/:subscribedToId', async (req, res) => {
    const { subscribedToId } = req.params;

    try {
        const subscriptions = await SubscriptionModel.find({ subscribedTo: subscribedToId });

        const subscriberIds = subscriptions
            .map(sub => sub.subscriber)
            .filter(mongoose.Types.ObjectId.isValid); 


        const users = await UserModel.find({ _id: { $in: subscriberIds } });

        res.json(users); 

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

subscriptionsRouter.get('/get-subscribers-num/:subscribedToId', async(req, res) => {
    const { subscribedToId } = req.params;

    try {
        const subscriptionsNum = await SubscriptionModel.countDocuments({ subscribedTo: subscribedToId });

        res.json({
            subNum: subscriptionsNum 
        });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Unable to fetch subscription count" });
    }
})




// POST

subscriptionsRouter.post('/subscribe', async (req, res) => {
    const { subscriberId, subscribedToId } = req.query;

    try {
        const subscription = await SubscriptionModel.findOne({ subscriber: subscriberId, subscribedTo: subscribedToId })

        if(subscription){
            res.json({
                message: "Subscription already exists"
            })
            return
        }
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

// DELETE

subscriptionsRouter.delete('/unsubscribe/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await SubscriptionModel.findByIdAndDelete(id)
        
        if (result) {
            res.status(200).json({
                message: "Unsubscribed succesfully"
            })
        } else {
            res.status(500).json({
                message: "Unable to unsubscribe"
            })
        }
        
    } catch (error) {
        res.status(500).json({
            error: "Unable to unsubscribe",
            message: error.message
        });
    }
})