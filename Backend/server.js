/* ======================== Import Library ======================== */
const express = require("express")
const cors = require("cors")
require("dotenv").config()


/* ======================== Middleware ============================ */
const app = express()
app.use(cors())
app.use(express.json())


/* ======================== Routes Import ========================= */
const updateItems = require("./routes/itemsRoutes")
const updateUser = require("./routes/userRoutes")


/* ======================== Routes ================================ */
app.use(updateItems)
app.use(updateUser)

/* ======================== Default Root ========================== */
app.get("/", (req, res) => {
    res.send("Server is running")
})


/* ======================== Start Server ========================== */
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT || 5000}`)
})