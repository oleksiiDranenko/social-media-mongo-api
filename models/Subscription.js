import mongoose, { Schema } from "mongoose";

const SubscriptionSchema = new Schema({
		subscriber: {type: String, required: true},
    	subscribedTo: {type: String, required: true}
	},
	{ versionKey: false }
)

export const SubscriptionModel = mongoose.model('subscriptions', SubscriptionSchema)