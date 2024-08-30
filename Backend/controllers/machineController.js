const {connectToDb, getDb} = require("../db/db")

let db

connectToDb((err) => {
    if(!err){
        db = getDb()
    }
})

module.exports.updateMachine = async (req, res) => {
    db.collection("machine")
}

module.exports.getMachine = async (req, res) => {
    db.collection("machine")
        .find()
}