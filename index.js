import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'
import dotenv from 'dotenv'
const app=express()
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
app.use('/posts',postRoutes)
dotenv.config()
const DATABASE_URL =process.env.DATABASE_URL
let PORT=process.env.PORT||5000
mongoose.connect(DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log('connected to db')
    app.listen(PORT,()=>console.log(`server running on port ${PORT}`))
    })
.catch(err=>{
    console.log(err.message)
    })
mongoose.set('useFindAndModify',false)
