require('dotenv').config()
const express = require('express')
const cors = require('cors')
const database = require('./database/db')
const errorHandler = require('./middleware/errorHandler')
database()
const PORT = 80 || process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/blog",require("./routes/blogRoutes"))

app.use("/api/category",require("./routes/categoryRoutes"))

app.use(errorHandler)
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))