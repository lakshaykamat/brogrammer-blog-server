const express = require('express')
const router = express.Router()

const {
    getAllUser,
    loginUser,
    getUser,
    registerUser, 
    deleteUser
} = require('../controller/userController')

router.route("/all")
    .get(getAllUser)


router.route("/:id")
    .get(getUser)
    .delete(deleteUser)

router.route("/login")
    .post(loginUser)


router.route("/register")
    .post(registerUser)


module.exports = router