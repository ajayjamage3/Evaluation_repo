const jwt = require("jsonwebtoken")
const authenticate = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        const decode = jwt.verify(token,"social")
        if(decode){
            const userId = decode.userId
            req.body.userId = userId
            next()
        }
        else{
            res.send("Please login")
        }
    }
    else{
        res.send("Please login")
    }
}
module.exports = {
    authenticate
}