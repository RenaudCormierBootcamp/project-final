const { MongoClient } = require("mongodb");  
const bcrypt = require('bcrypt'); 
require("dotenv").config();  

const { MONGO_URI } = process.env;  
const options = {   
};


const createUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        const db = client.db("userinfo");
        
        const userInfo = {...req.body}; 

        const collection = db.collection("users");
        let _checkEmailUser = await collection.findOne({ email: userInfo.email.toLowerCase() }); 
        let _checkUsernameUser = await collection.findOne({ lowerusername: userInfo.username.toLowerCase() }); 

        if (!userInfo.email || !userInfo.username || !userInfo.email )
        {
            res.status(418).json({message: "information missing"}); 
        }
        else if (_checkEmailUser != null)
        {
            res.status(418).json({message: "email already in use"});
        }
        else if (_checkUsernameUser != null)
        {
            res.status(418).json({message: "username already in use"});
        }
        else
        {
            const _numero = Math.floor(Math.random()*999999);
            const _hashPassword = await bcrypt.hash(userInfo.password,10);  
            const _hashEmail = await bcrypt.hash("banana"+String(_numero)+userInfo.email,10); 
            userInfo.numero =_numero;
            userInfo.lowerusername = userInfo.username.toLowerCase();
            userInfo.email = userInfo.email.toLowerCase();
            userInfo.password = _hashPassword;
            userInfo.createdPacks = 0;
            userInfo.currentSaveGame = { game:null };
            userInfo.userLevel = 0;
            userInfo.gamerRank = 0; 
            userInfo.creatorTeam = 0; 
             
            let _cookieSession = userInfo.username+"_"+_hashEmail;
             
            const _newUser = await db.collection("users").insertOne(userInfo);

            const db2 = client.db("Cards");
            const _newPack = await db2.collection("userCards").insertOne({user:userInfo.username,packNumber:0});

            res.cookie('session', _cookieSession, 
                { httpOnly:true,sameSite:"Strict" }
            ); 
            res.status(200).json({ message: "user created hurrah"});
             
        }
        
         
         
    }
    catch (error) {
        res.status(500).json({message:error.message})
    }
    finally{
        client.close();
    }
}



module.exports = createUser;