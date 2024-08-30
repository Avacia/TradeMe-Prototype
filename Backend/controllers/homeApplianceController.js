const {connectToDb, getDb} = require("../db/db")

let db

connectToDb((err) => {
    if(!err){
        db = getDb()
    }
})

module.exports.updateHomeAppliance = async (req, res) => {
    const appliance = req.body
    
    try{
        db.collection("home appliance")
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

module.exports.getHomeAppliance = async (req, res) => {
    let homeApplianceArray = []

    try{
        db.collection("home appliance")
            .find()
            .forEach((appliance) => homeApplianceArray.push(appliance))
            .then(() =>{
                res.status(200).json(homeApplianceArray)
            })
    }
    catch(error){
        res.status(500).json({error: 'Could not fetch the documents'})
    }
}