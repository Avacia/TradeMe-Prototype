const {connectToDb, getDb} = require("../db/db")
const { ObjectId } = require("mongodb")

module.exports.updateItem = async (req, res) => {

    await connectToDb((error) => {
        if(error){
            return res.status(500).json({error: "Failed to connect to database"})
        }
        
        let db = getDb()
        console.log("request received by body: ", req.body.item._id)
        const item = req.body.item
        console.log("Updated item: ", item)

        if(!ObjectId.isValid(item._id)){
            return res.status(400).json({error: "Invalid item ID"})
        }
    
        if(item.bid_placed === true){
            return res.status(500).json({error: "Bid has been placed already"})
        }
    
        try{
            db.collection("items")
                .updateOne({_id: new ObjectId(item._id)}, {$set:{bid_placed: true}})
                .then((result) => {
                    if(result.modifiedCount === 1){
                        res.status(200).json({message: "Bid placed successfully", result})
                    }
                    else{
                        res.status(404).json({message: "Failed to place the bid"})
                    }
                })
                .catch((error) => {
                    console.error("Database operation failed: ", error)
                    res.status(500).json({error: "Unable to connect to database"})
                })
        }
        catch(error){
            console.error("Unexpected error: ", error)
            res.status(500).json({error: "Unable to process the request"})
        }
    })
}

module.exports.getItem = async (req, res) => {
    let db = getDb()

    try{
        const itemArray = await db.collection("items").find().toArray()
        res.status(200).json(itemArray)
    }
    catch(error){
        res.status(500).json({error: 'Could not fetch the documents'})
    }
}