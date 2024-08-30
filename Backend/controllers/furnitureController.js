const {connectToDb, getDb} = require("../db/db")

let db

connectToDb((err) => {
    if(!err){
        db = getDb()
    }
})

module.exports.updateFurniture = async (req, res) => {
    const furniture = req.body

    try{
        db.collection("furniture")
            .insertOne(furniture)
            .then(result => {
                res.status(201).json(result)
            })
            .catch(error){
                res.status(500).json({error: "Could not create new profile or update current profile"})
            }
    }
    catch(error){
        res.status(500).json({error: "Unable to connect database"})
    }
    
}

module.exports.getFurniture = async (req, res) => {
    let furnitureArray = []

    try{
        db.collection("furniture")
            .find()
            .forEach((furniture) => furnitureArray.push(furniture))
            .then(() =>{
                res.status(200).json(furnitureArray)
            })
    }
    catch(error){
        res.status(500).json({error: 'Could not fetch the documents'})
    }
}