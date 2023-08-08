import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
    	username: { type: String, required: true },
    	userId: { type: String, required: true },
    	value: { type: String, required: true },
    	date: { type: String, required: true },
  	},
  	{ versionKey: false }
)

export const PostModel = mongoose.model('posts', PostSchema)