import mongoose, {Schema} from 'mongoose';

const LikeSchema = new Schema({
        userId: {type: String, requited: true},
        postId: {type: String, required: true}
    },
    { versionKey: false }
)

export const LikesModel = mongoose.model('likes', LikeSchema)