const express = require('express')
const router = express.Router()
const itemsController = require("../controllers/itemsController")

router.post("/updateItems", itemsController.updateItem)
router.get("/getItems", itemsController.getItem)

module.exports = router