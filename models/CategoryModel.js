const mongoose = require('mongoose')
const CategorySchema = mongoose.Schema(
    {
        name:{
            type:Array,
            required:[true,"Category Name is required"],
            unique:[true,"Category name should be unique"]
        },
        blogCount:{
            type:Number,
            default:0
        }
    },
)
module.exports = mongoose.model("Category",CategorySchema)