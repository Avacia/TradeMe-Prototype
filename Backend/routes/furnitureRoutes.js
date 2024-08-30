const express = require("express")
const router = express.Router()
const furnitureController = require("../controllers/furnitureController")

router.post("/updateFurniture", furnitureController.updateFurniture)
router.get("/getFurniture",furnitureController.getFurniture)


module.exports = router