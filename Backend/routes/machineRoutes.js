const express = require('express')
const router = express.Router()
const machineController = require("../controllers/machineController")

router.post("/updateMachine", machineController.updateMachine)
router.get("/getMachine", machineController.getMachine)

module.exports = router