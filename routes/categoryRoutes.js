const express = require('express')
const router = express.Router()

const {getBlogsWithCategory,getAllCategory} = require('../controller/categoryController')


router.route("/").get(getAllCategory)
router.route("/:name").get(getBlogsWithCategory)
module.exports = router