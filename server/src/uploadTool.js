const { MongoClient } = require("mongodb");  
const bcrypt = require('bcrypt'); 
require("dotenv").config();  
const CDAT = require("./testdataCopy.js"); 

const { MONGO_URI } = process.env;  
const options = {    

};


const uploadTool = async () => {
    const client = new MongoClient(MONGO_URI, options); 
    const cardDb = client.db("Cards");  
    const _bigObj = {CDAT: CDAT}; 
    const getCards = await cardDb.collection("userCards").findOne({"user":"Renaud"}); 
    _bigObj.CDAT.landTemplate.effects = [];
    _bigObj.CDAT.MLAND[0] = getCards.pack0.packCards[0];
    _bigObj.CDAT.MLAND[1] = getCards.pack0.packCards[1];
    _bigObj.CDAT.MLAND[2] = getCards.pack0.packCards[2];
    _bigObj.CDAT.MLAND[3] = getCards.pack0.packCards[3];
    _bigObj.CDAT.MLAND[4] = getCards.pack0.packCards[4];
    _bigObj.CDAT.MLAND[5] = getCards.pack0.packCards[5];
    _bigObj.CDAT.MFEAT[0] = getCards.pack0.packCards[6];
    _bigObj.CDAT.MFEAT[1] = getCards.pack0.packCards[7];
    _bigObj.CDAT.MFEAT[2] = getCards.pack0.packCards[8];
    _bigObj.CDAT.MFEAT[3] = getCards.pack0.packCards[9];
    _bigObj.CDAT.BasicPacks = [];
    _bigObj.CDAT.BasicPacks.push(getCards.pack1);
    _bigObj.CDAT.BasicPacks.push(getCards.pack2); 

    const _uploadPack = await cardDb.collection("basicCards").updateOne({"defaultId":"basic"},
    {
        $set: {
            ..._bigObj,
        }
    }); 
    console.log(_uploadPack);
} 


uploadTool();