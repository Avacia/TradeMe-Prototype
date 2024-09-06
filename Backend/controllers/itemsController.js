const {connectToDb, getDb} = require("../db/db")

let db

connectToDb((err) => {
    if(!err){
        db = getDb()
    }
})

module.exports.updateItem = async (req, res) => {
    const item = req.body

    try{
        db.collection("items")
            .insertOne(item)
            .then(result =>{
                res.status(201).json(result)
            })
            .catch((error) => {
                res.status(500).json({error: "Could not create new profile or update current profile"})
            })
    }
    catch(error){
        res.status(500).json({error: "Unable to connect database"})
    }
}

module.exports.getItem = async (req, res) => {
    let itemArray = []

    try{
        db.collection("items")
            .find()
            .forEach((item) => itemArray.push(item))
            .then(() =>{
                res.status(200).json(itemArray)
            })
    }
    catch(error){
        res.status(500).json({error: 'Could not fetch the documents'})
    }
}