const {connectToDb, getDb} = require("../db/db")

let db

connectToDb((err) => {
    if(!err){
        db = getDb()
    }
})

module.exports.updateSportAppliance = async (req, res) => {
    db.collection("sport appliance")
}

module.exports.getSportAppliance = async (req, res) => {
    db.collection("sport appliance")
        .find()
}