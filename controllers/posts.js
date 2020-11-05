import PostModel from '../models/posts.js'
export const getPosts=async (req,res)=>{
    try{
        const posts=await PostModel.find();
        res.status(200).json(posts)

    }
    catch(err){
        res.status(404).json({message:err.message})

    }
}
export const createPost=async (req,res)=>{
    const body=req.body
    const newPost=new PostModel(body)
    try{
        await newPost.save();
        res.status(200).json(newPost)
        
    }
    catch(err){
        res.status(409).json({message:err.message})

    }
}