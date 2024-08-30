const express = require('express')
const router = express.Router()
const sportApplianceController = require('../controllers/sportApplianceController')

router.post("/updateSportAppliance", sportApplianceController.updateSportAppliance)
router.get("/getSportAppliance", sportApplianceController.getSportAppliance)

module.exports = router