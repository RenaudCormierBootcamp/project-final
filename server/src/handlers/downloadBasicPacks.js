const { MongoClient } = require("mongodb");  
const bcrypt = require('bcrypt'); 
require("dotenv").config();  

const { MONGO_URI } = process.env;  
const options = {   
};


const downloadBasicPacks = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try { 
        const db = client.db("Cards");   
        const collection = db.collection("basicCards"); 
        const _basic = await collection.findOne({ defaultId: "basic" });
        
        res.status(200).json({message:"basic cards sent",body:_basic});  
        
    }
    catch (error) {
        res.status(500).json({message:error.message})
    }
    finally{
        client.close(); 
    }
} 

module.exports = downloadBasicPacks;