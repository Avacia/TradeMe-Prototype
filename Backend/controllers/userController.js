const {connectToDb, getDb} = require("../db/db")

let db

connectToDb((err) => {
    if(!err){
        db = getDb()
    }
})

module.exports.updateUser = async (req, res) => {
    const user = req.body

    try{
        db.collection("user")
            .insertOne(user)
            .then(result => {
                res.status(201).json(result)
            })
            .catch((error) => {
                res.status(500).json({error: "Could not create new user or update current user"})
            })
    }
    catch(error){
        res.status(500).json({error: "Unable to connect database"})
    }
}

module.exports.getUser = async (req, res) => {
    let userArray = []

    try{
        db.collection("user")
            .find()
            .forEach((user) => userArray.push(user))
            .then(() =>{
                res.status(200).json(userArray)
            })
    }
    catch(error){
        res.status(500).json({error: 'Could not fetch the documents'})
    }
}