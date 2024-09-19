const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

const itemRoute = require("./routes/itemRoute")

app.use(itemRoute)

app.get("/", (req, res) => {
    res.send("Server is Connected!!")
})

app.listen(process.env.PORT || 6000, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT || 6000}`)
})