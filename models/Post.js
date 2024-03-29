import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
    	username: { type: String, required: true },
		userAvatar: { type: Number, required: true },
    	userId: { type: String, required: true },
    	value: { type: String, required: true },
    	img: { type: String, required: false },
    	date: { type: String, required: true },
		edited: { type: Boolean, required: false }
  	},
  	{ versionKey: false }
)

export const PostModel = mongoose.model('posts', PostSchema)