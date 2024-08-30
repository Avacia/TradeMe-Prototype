const {connectToDb, getDb} = require("../db/db")

let db

connectToDb((err) => {
    if(!err){
        db = getDb()
    }
})

module.exports.updateMachine = async (req, res) => {
    const machine = req.body

    try{
        db.collection("machine")
            .insertOne(machine)
            .then(result =>{
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

module.exports.getMachine = async (req, res) => {
    let machineArray = []

    try{
        db.collection("machine")
            .find()
            .forEach((machine) => machineArray.push(machine))
            .then(() =>{
                res.status(200).json(machineArray)
            })
    }
    catch(error){
        res.status(500).json({error: 'Could not fetch the documents'})
    }
}