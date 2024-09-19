const express = require("express")
const router = express.Router()
const itemController = require("../controllers/itemController")

router.get("/getItem", itemController.getItemFromDb)
router.get("/getItemById/:id", itemController.getItemById)
router.post("/updateItemBid", itemController.updateItemBid)

module.exports = router