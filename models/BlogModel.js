const mongoose = require('mongoose')
const BlogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required!"]
        },
        image: {
            type: String,
            required: [true, "Image is required!"]
        },
        description: {
            type: String,
            required: [true, "Description is required!"]
        },
        body: {
            type: String,
            required: [true, "Body is required!"]
        },
        publishedAt: {
            type: Date,
            default: Date.now().toString()
        },
        category:{
            type:Array,
            required:[true,"Category is required!"]
        }
    },
    { timestamps: true }
)
module.exports = mongoose.model("Blog",BlogSchema)