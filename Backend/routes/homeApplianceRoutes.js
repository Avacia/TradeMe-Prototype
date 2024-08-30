const express = require("express")
const router = express.Router()
const homeApplianceController = require("../../controllers/homeApplianceController")

router.post("/updateHomeAppliance", homeApplianceController.updateHomeAppliance)
router.get("/getHomeAppliance", homeApplianceController.getHomeAppliance)

module.exports = router