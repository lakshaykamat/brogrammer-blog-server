const jwt = require('jsonwebtoken')
const { tryCatch } = require("../utils/tryCatch.js");
const asyncHandler = require('express-async-handler');


const auth = (req,res,next)=>{
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next() 
    } catch (error) {
        res.status(400).json({ msessage:error.message})
    }
    
}
module.exports = auth