const {connectToDb, getDb} = require("../db/db")
const { ObjectId } = require("mongodb")

let db

connectToDb((err) => {
    if(!err){
        db = getDb()
        console.log("Connected to the database successfully")
    }
    else{
        console.log("Database connection error:", err)
    }
})

module.exports.updateItem = async (req, res) => {
    const item = req.body
    if(!ObjectId.isValid(item._id)){
        return res.status(400).json({error: "Invalid item ID"})
    }

    if(item.bid_placed === true){
        return res.status(500).json({error: "Bid has been placed already"})
    }

    try{
        const result = await db.collection("items")
            .updateOne({_id: ObjectId(item._id)}, {$set:{bid_placed: true}})
        console.log("result", result)
        if(result.modifiedCount === 1){
            res.status(200).json({ message: "Bid placed successfully", result})
        }
        else{
            res.status(404).json({ message: "Item not found or no bid placed"})
        }
    }
    catch(error){
        res.status(500).json({error: "Unable to connect database"})
    }
}

module.exports.getItem = async (req, res) => {

    try{
        const itemArray = await db.collection("items").find().toArray()
        res.status(200).json(itemArray)
    }
    catch(error){
        res.status(500).json({error: 'Could not fetch the documents'})
    }
}