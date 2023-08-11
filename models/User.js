import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    	username: { type: String, required: true, unique: true },
    	password: { type: String, required: true },
    	avatar: { type: Number, required: true },
  	},
  	{ versionKey: false }
)

export const UserModel = mongoose.model('users', UserSchema)