const express = require('express')
const router = express.Router()
const machineController = require("../controllers/itemsController")

router.post("/updateItems", machineController.updateItem)
router.get("/getItems", machineController.getItem)

module.exports = router