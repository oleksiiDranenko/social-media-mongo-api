import mongoose, {Schema} from 'mongoose';

const CommentSchema = new Schema({
        username: {type: String, required: true},
        avatar: {type: Number, required: true},
        userId: {type: String, requited: true},
        postId: {type: String, required: true},
        date: {type: String, required: true},
        value: {type: String, required: true}
    },
    { versionKey: false }
)

export const CommentModel = mongoose.model('comments', CommentSchema)