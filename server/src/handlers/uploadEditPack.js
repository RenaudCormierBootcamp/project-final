const { MongoClient } = require("mongodb");  
const bcrypt = require('bcrypt'); 
require("dotenv").config();  

const { MONGO_URI } = process.env;  
const options = {   
};


const uploadEditPack = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try { 
        const db = client.db("userinfo");  
        const _cookie =  req.get("cookie");
        const collection = db.collection("users"); 
        if (!_cookie)
        { 
            res.status(404).json({message:"please login to save packs"}); 
        }
        else if ( _cookie.substr(0,8) === "session=")
        { 
            const _underscore = _cookie.indexOf("_");
            const _username = _cookie.substr(8,_underscore-8);
            const _bigHash = await decodeURIComponent(_cookie.substr(_underscore+1));  
            const _checkUsernameUser = await collection.findOne({ username: _username });  
            if (_checkUsernameUser != null)
            {  
                const _checkCrypt = await bcrypt.compare("banana"+String(_checkUsernameUser.numero)+_checkUsernameUser.email,_bigHash); 
                if (_checkCrypt)
                { 
                    const cardDb = client.db("Cards");  
                    if (_checkUsernameUser.userLevel == 0 && req.body.packIndex > 1)
                    {
                        res.status(418).json({message:"unconfirmed users can only save 2 packs"});
                    }
                    else if (_checkUsernameUser.userLevel == 1 && req.body.packIndex > 10)
                    {
                        res.status(418).json({message:"max packs of 10"});
                    }
                    else
                    {
                        const _packNum = "pack"+String(req.body.packIndex);  
                        
                        const _checkUserHasCards = await cardDb.collection("userCards").findOne({ user: _username }) 
                        if (_checkUserHasCards === null)
                        {
                            const _uploadPack = await cardDb.collection("userCards").insertOne({"user":_username});
                            res.status(418).json({message:"possible mistake try again"}); 
                        }
                        else
                        {
                            const _newObj ={[_packNum]:req.body}
                            console.log("check",req.body.packIndex,",",_checkUserHasCards.packNumber);
                            if (req.body.packIndex >= _checkUserHasCards.packNumber)
                            {
                                _newObj.packNumber = req.body.packIndex+1;
                            }
                            const _uploadPack = await cardDb.collection("userCards").updateOne({"user":_username},
                            {
                                $set: {
                                    ..._newObj,
                                }
                            }); 
                            res.status(200).json({message:"pack uploaded"})
                        }
                         
                    }
                }
                else
                {    
                    res.clearCookie("session",{ httpOnly:true,sameSite:"Strict" }); 
                    res.status(418).json({message:"session error, please login again"}); 
                }
            }
            else
            { 
                res.clearCookie("session",{ httpOnly:true,sameSite:"Strict" }); 
                res.status(418).json({message:"session error, please login again"}); 
            }
        }
        else
        { 
            res.clearCookie("session",{ httpOnly:true,sameSite:"Strict" });
            res.status(204); 
        }   
    }
    catch (error) {
        res.status(500).json({message:error.message})
    }
    finally{
        client.close(); 
    }
} 

module.exports = uploadEditPack;