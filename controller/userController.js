const UserModel = require("../models/UserModel.js");
const { tryCatch } = require("../utils/tryCatch.js");
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidator,loginValidator} = require('../lib/validation.js') 


const getAllUser = tryCatch(asyncHandler(async (req, res) => {
    const users = await UserModel.find({})
    res.json(users)
}))


const getUser = tryCatch(asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.params.id)
    res.json(user)
}))


const editUser = tryCatch(asyncHandler(async (req, res) => {

}))


const deleteUser = tryCatch(asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.params.id)
    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }
    const data = await UserModel.findByIdAndDelete({ _id: req.params.id },)
    res.json(data)
}))

const loginUser = tryCatch(asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //validating the body
    const {error} = loginValidator(req.body)
    if(error) return res.status(400).json({ message:error.details[0].message })

    //Checking the existing user with this email
    const user = await UserModel.find({ email })
    if (user.length <= 0) {
        return res.status(400).json({ message: "User not found" })
    } else {
        const validPassword = bcrypt.compareSync(password, user[0].password)
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" })
        }
        const token = jwt.sign({ _id: user[0]._id }, process.env.JWT_SECRET)
        res.header('auth-token', token).json({token})
    }
}))
const registerUser = tryCatch(asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const {error} = registerValidator(req.body)

    if(error) return res.status(400).json({ message:error.details[0].message })

    //Checking the existing user with this email 
    const user = await UserModel.find({ email })


    if (user.length > 0) {
        return res.status(400).json({ message: "User already exists" })
    } else {
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword
        })
        res.json(newUser)
    }

}))

module.exports = {
    getAllUser,
    deleteUser,
    editUser,
    getUser,
    loginUser,
    registerUser
}