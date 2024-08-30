const express = require("express")
const router = express.Router()
const userController = require("../../controllers/userController")

router.post("/updateUser", userController.updateUser)
router.get("/getUser", userController.getUser)

module.exports = router