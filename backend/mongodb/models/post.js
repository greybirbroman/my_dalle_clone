import mongoose from "mongoose";

const Post = new mongoose.Schema({
    name: {type: String, requred: true},
    prompt: {type: String, requred: true},
    photo: {type: String, requred: true},
})

const PostSchema = mongoose.model('Post', Post)

export default PostSchema