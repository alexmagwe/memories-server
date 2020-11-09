import mongoose from 'mongoose';
import PostModel from '../models/posts.js'
const errorMessage = 'No post found for that id'
export const getPosts = async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.status(200).json(posts)

    }
    catch (err) {
        res.status(404).json({ message: err.message })

    }
}
export const createPost = async (req, res) => {
    const body = req.body
    const newPost = new PostModel(body)
    try {
        await newPost.save();
        res.status(200).json(newPost)

    }
    catch (err) {
        res.status(409).json({ message: err.message })

    }
}
export const updatePost = async (req, res) => {
    const { id: _id } = req.params
    const post = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(errorMessage)
    const updatedPost = await PostModel.findByIdAndUpdate(_id, post, { new: true });//new:true returns the updated post
    res.json(updatedPost)

}
export const deletePost = async (req, res) => {
    const { id: id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(errorMessage)
    await PostModel.findByIdAndRemove(id);
    res.json({ message: 'Post deleted successfully' })



}
export const likePost = async(req, res) => {
    const {id}= req.params
    console.log(req.params)
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(errorMessage)
    const post = await PostModel.findById(id)
    const newPost = await PostModel.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true })
    return res.json(newPost)


}