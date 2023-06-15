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
        author:{
            type:String,
            required:[true,"Author is required!"]
        },
        publishedAt: {
            type: String,
            required: [true, "Published Date is required!"]
        },
        slug:{
            type:String,
            required:[true,"Slug is required!"],
            undefined: [true,"Slug must be unique"]
        },
        category:{
            type:String,
            required:[true,"Category is required!"]
        }
    },
    { timestamps: true }
)
module.exports = mongoose.model("Blog",BlogSchema)