const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.PORT
require("./db/conn")

const initializeSentry = require('./middalware/sentry');

initializeSentry(process.env.SENTRY_DSN)

const userRoute = require("./routes/userImg.route")
app.use(userRoute)

app.get("/", (req, res) => {
    res.send("<h1>Node Cloudinary</h1>")
})


app.listen(port, () => {
    console.log(`Connected on port http://localhost:${port}`)
})

