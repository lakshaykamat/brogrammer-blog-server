const mongoose = require('mongoose')
const UserSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Username is required"],
            min:5,
            max:20
           
        },
        email:{
            type:String,
            unique:[true,"User email should be unique"],
            required:[true,"user email is required"],
            max:255
        },
        password:{
            type:String,
            required:[true,"password is required"],
            min:5,
            max:255
        },
        date:{
            type:Date,
            default:Date.now,
        }
    },
)
module.exports = mongoose.model("User",UserSchema)