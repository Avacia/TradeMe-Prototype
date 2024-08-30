const {connectToDb, getDb} = require("../db/db")

let db

connectToDb((err) => {
    if(!err){
        db = getDb()
    }
})

module.exports.updateSportAppliance = async (req, res) => {
    const appliance = req.body

    try{
        db.collection("sport appliance")
            .insertOne(appliance)
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

module.exports.getSportAppliance = async (req, res) => {
    let sportApplianceArray = []

    try{
        db.collection("sport appliance")
            .find()
            .forEach((appliance) => sportApplianceArray.push(appliance))
            .then(() =>{
                res.status(200).json(sportApplianceArray)
            })
    }
    catch(error){
        res.status(500).json({error: 'Could not fetch the documents'})
    }
}