const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.PORT
require("./db/conn")

app.get("/", (req, res) => {
    res.send("<h1>Node Cloudinary</h1>")
})

//----------ROUTES-----------
const userRoute = require("./routes/userImg.route")
app.use(userRoute)


app.listen(port, () => {
    console.log(`Connected on port http://localhost:${port}`)
})

