const express = require("express")
const router = express.Router()
const updateBidController = require("../controllers/updateBidController")

router.post("/updateBid", updateBidController.updateBid)
router.get("/getBid", updateBidController.getBid)


module.exports = router