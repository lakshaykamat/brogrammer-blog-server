require('dotenv').config()
const express = require('express')
const path = require('path')
const port = 8000|| process.env.PORT
const cors = require('cors')
const BlogModel = require("./models/BlogModel.js");
const database = require('./database/db.js')
const errorHandler = require('./middleware/errorHandler')
const auth = require('./middleware/verifyToken.js')
database()
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true }))


app.use(
    express.static(path.join(path.resolve(),"public"))
    )

//Setting up view engine
app.set('view engine', 'ejs')


//Page Routes
app.get("/",(req, res) => {
  res.render('index')
})
app.get("/createblog",(req, res) => {
  res.render('createblog')
})

app.get("/blogs",async(req,res) => {
  const blogs = await BlogModel.find();
  res.render('blogs',{blogs})
})

//API Routes
app.use("/api/blog",require("./routes/blogRoutes"))

app.use("/api/user",require("./routes/userRoutes"))

app.use(errorHandler)
app.listen(port, () => console.log(`Server is running now :)`))