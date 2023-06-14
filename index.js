require('dotenv').config()
const express = require('express')
const path = require('path')
const port = 80|| process.env.PORT
const cors = require('cors')
const database = require('./database/db')
const errorHandler = require('./middleware/errorHandler')
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


app.get("/",(req, res) => {
  res.render('index')
})
app.post("/",(req, res) => {
    console.log(req.body)
});
app.use("/api/blog",require("./routes/blogRoutes"))

app.use("/api/category",require("./routes/categoryRoutes"))

app.use(errorHandler)
app.listen(port, () => console.log(`Server is running now :)`))