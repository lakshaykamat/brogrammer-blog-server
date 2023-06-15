const express = require('express')
const router = express.Router()

const {getAllBlogs,CreateBlog,deleteBlog,getBlog,editBlog,deleteAllBlog,getAllCategory} = require('../controller/blogController')
const auth = require('../middleware/verifyToken')

router.route("/").get(getAllBlogs).post(auth,CreateBlog).delete(deleteAllBlog)
router.route("/:id").get(getBlog).put(editBlog).delete(deleteBlog)

router.route("/category/all").get(getAllCategory)
module.exports = router