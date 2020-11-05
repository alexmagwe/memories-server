import mongoose from 'mongoose'
const postSchema=mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    tags:[String],
    comments:[String],
    selectedFile:String,//convert image to base64 string
    likeCount:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
})
const PostModel=mongoose.model('PostModel',postSchema)
export default PostModel