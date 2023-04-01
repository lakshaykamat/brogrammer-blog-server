const express = require('express')
const router = express.Router()

const {getAllBlogs,CreateBlog,deleteBlog,getBlog,editBlog,deleteAllBlog} = require('../controller/blogController')

router.route("/").get(getAllBlogs).post(CreateBlog).delete(deleteAllBlog)
router.route("/:id").get(getBlog).put(editBlog).delete(deleteBlog)

// router.route("/category").get(getAllCategory)
// router.route("/category/:categoryName").get(getBlogsWithCategory)
module.exports = router