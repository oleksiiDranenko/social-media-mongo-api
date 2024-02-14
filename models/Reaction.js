import mongoose, {Schema} from 'mongoose';

const ReactionsSchema = new Schema({
        userId: {type: String, requited: true},
        postId: {type: String, required: true},
        reactionId: {type: Number, required: true}
    },
    { versionKey: false }
)

export const ReactionsModel = mongoose.model('reactions', ReactionsSchema)