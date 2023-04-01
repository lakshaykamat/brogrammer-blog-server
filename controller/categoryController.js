const BlogModel = require("../models/BlogModel.js");
const CategoryModel = require("../models/CategoryModel.js")
const { tryCatch } = require("../utils/tryCatch.js");
const asyncHandler = require('express-async-handler');




const getAllCategory = tryCatch(asyncHandler(async (req, res) => {
    const cate = await CategoryModel.find()
    res.json(cate)
}))



const getBlogsWithCategory = tryCatch(asyncHandler(async (req, res) => {
    const blogs = await BlogModel.find({ category: req.params.name })
    if (!blogs) {
        res.status(404)
        throw new Error("blog not found")
    }
    res.status(200).json(blogs)
    res.json(blogs)
}))

module.exports = {getAllCategory,getBlogsWithCategory}