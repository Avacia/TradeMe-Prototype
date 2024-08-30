const {connectToDb, getDb} = require("../db/db")

let db

connectToDb((err) => {
    if(!err){
        db = getDb()
    }
})

module.exports.updateUser = async (req, res) => {
    db.collection("user")
}

module.exports.getUser = async (req, res) => {
    db.collection("user")
        .find()
}