const {connectToDb, getDb} = require("../db/db")

let db

connectToDb((err) => {
    if(!err){
        db = getDb()
    }
})

module.exports.updateHomeAppliance = async (req, res) => {
    db.collection("home appliance")
}

module.exports.getHomeAppliance = async (req, res) => {
    db.collection("home appliance")
        .find()
}