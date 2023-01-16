const express = require("express")
const app = express()
app.use(express.json())
const {connection} = require("./config/db")
const cors = require("cors")
app.use(cors())
const {authenticate} = require("./middlewares/auth.mid")
const {userRouter} = require("./routes/user.route")
const {postRouter} = require("./routes/post.route")
require("dotenv").config()
app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(err)
    }
    console.log(`Server running at ${process.env.port}`)
})