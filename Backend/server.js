/* ======================== Import Library ======================== */
const express = require("express")
const cors = require("cors")
require("dotenv").config()


/* ======================== Middleware ============================ */
const app = express()
app.use(cors())
app.use(express.json())


/* ======================== Routes Import ========================= */
const updateFurniture = require("./routes/furnitureRoutes")
const updateHomeAppliance = require("./routes/homeApplianceRoutes")
const updateMachine = require("./routes/machineRoutes")
const updateSportAppliance = require("./routes/sportApplianceRoutes")
const updateUser = require("./routes/userRoutes")


/* ======================== Routes ================================ */
app.use(updateFurniture)
app.use(updateHomeAppliance)
app.use(updateMachine)
app.use(updateSportAppliance)
app.use(updateUser)

/* ======================== Default Root ========================== */
app.get("/", (req, res) => {
    res.send("Server is running")
})


/* ======================== Start Server ========================== */
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT || 5000}`)
})