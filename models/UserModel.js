const mongoose = require('mongoose')
const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Username is required"],
            min: 5,
            max: 20

        },
        email: {
            type: String,
            unique: [true, "User email should be unique"],
            required: [true, "user email is required"],
            max: 255
        },
        designation: {
            type: String,
            required: [true, "Designation is required"],
            min: 5,
            max: 255
        },
        bio: {
            type: String,
            required: [true, "bio is required"],
            min: 5,
            max: 255
        },
        image:{
            type: String,
            required: [true, "image is required"],
        },
        password: {
            type: String,
            required: [true, "password is required"],
            min: 5,
            max: 255
        },
        date: {
            type: Date,
            default: Date.now,
        }
    },
)
module.exports = mongoose.model("User", UserSchema)