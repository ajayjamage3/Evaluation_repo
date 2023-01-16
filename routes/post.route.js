const express = require("express")
const app = express()
app.use(express.json())
const {PostModel} = require("../models/post.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const postRouter = express.Router()

postRouter.get("/",async(req,res)=>{
    const query = req.query
    console.log(query)
   res.send(await PostModel.find(query))
})

postRouter.post("/create",async(req,res)=>{
    try {
       const posts = new PostModel(req.body)
       await posts.save()
       res.send("Posted Done")
    } catch (error) {
        console.log(error)
        res.send("something went wrong")
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const post = await PostModel.findOne({"_id":req.params.id})
    const postId = post.userId
    const userId = req.body.userId
  
    try {
      if(postId !== userId){
        res.send("You are not authorized")
      }
      else{
        await PostModel.findByIdAndUpdate({_id:req.params.id},req.body)
        res.send("Updated")
      }
    } catch (error) {
        console.log(error)
        res.send("something went wrong")
    }
})
postRouter.delete("/delete/:id",async(req,res)=>{
    const post = await PostModel.findOne({"_id":req.params.id})
    const postId = post.userId
    const userId = req.body.userId
    console.log(postId,userId)
    try {
      if(postId !== userId){
        res.send("You are not authorized")
      }
      else{
        await PostModel.findByIdAndDelete({_id:req.params.id})
        res.send("Deleted")
      }
    } catch (error) {
        console.log(error)
        res.send("something went wrong")
    }
})


module.exports = {
  postRouter
}