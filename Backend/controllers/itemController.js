const { connectToDb, getDb } = require("../db/db")
const { ObjectId } = require("mongodb")

module.exports.getItemFromDb = async(req, res) => {
    try{
        await connectToDb((error) => {
            if(error){
                return res.status(500).json({error: "Failed to connect to database"})
            }
        })

        const db = getDb()
        const data = await db.collection("Items").find().toArray()
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({error: "Unable to fetch document"})
    }
}

module.exports.getItemById = async(req, res) => {
    try{
        await connectToDb((error) => {
            if(error){
                return res.status(500).json({error: "Failed to connect to database"})
            }
        })

        const db = getDb()
        const id = req.params.id
        console.log(id)
        if(ObjectId.isValid(id)){
            const result = await db.collection("Items").findOne({_id: new ObjectId(id)})
            
            if(result){
                return res.status(200).json(result)
            }
            else{
                return res.status(404).json({error: "Item not found"})
            }
        }
        else{
            res.status(400).json({error: "Not a valid Document Id"})
        }
    }
    catch(error){
        console.error(error.message)
        res.status(500).json({error: "Unable to fetch document"})
    }
}


module.exports.updateItemBid = async(req, res) => {
    try{
        await connectToDb((error) => {
            if(error){
                return res.status(500).json({error: "Failed to connect to database"})
            }
        })

        const db = getDb()
        const id = req.body.id
        const user = req.body.user
        const amount = req.body.currentPrice

        if(!ObjectId.isValid(id)){
            return res.status(400).json({error:"Invalid item ID"})
        }

        try{
            const result = await db.collection("Items")
            .updateOne({_id: new ObjectId(id)}, {$set:
                                                    {
                                                        reserve_price: {[user]: amount}, 
                                                        price: amount
                                                    }
                                                }
            )
            if (result.modifiedCount === 0) {
                return res.status(404).json({ error: "Item not found or no changes made" });
            }

            return res.status(200).json({ message: "Bid updated successfully" });
        }
        catch(error){
            res.status(500).json({error: "Unable to process the request"})
        }

    }
    catch(error){
        res.status(500).json({error: "Unable to fetch document"})
    }
}