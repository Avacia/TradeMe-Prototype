/* ======================== Import Library ======================== */
const express = require("express")
const cors = require("cors")
require("dotenv").config()


/* ======================== Middleware ============================ */
const app = express()
app.use(cors())
app.use(express.json())


/* ======================== Routes Import ========================= */
const updateBidRouter = require("./routes/updateBidRoutes")


/* ======================== Routes ================================ */
app.use(updateBidRouter)


/* ======================== Default Root ========================== */
app.get("/", (req, res) => {
    res.send("Server is running")
})


/* ======================== Start Server ========================== */
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT || 5000}`)
})