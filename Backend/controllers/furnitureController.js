const {connectToDb, getDb} = require("../db/db")

let db

connectToDb((err) => {
    if(!err){
        db = getDb()
    }
})

module.exports.updateFurniture = async (req, res) => {
    db.collection("furniture")
}

module.exports.getFurniture = async (req, res) => {
    db.collection("furniture")
        .find()
}