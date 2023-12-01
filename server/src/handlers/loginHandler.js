const { MongoClient } = require("mongodb");  
const bcrypt = require('bcrypt');
require("dotenv").config();  

const { MONGO_URI } = process.env;  
const options = {   
}; 

const loginHandler = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        const db = client.db("userinfo"); 
        const userInfo = {...req.body}; 

        const collection = db.collection("users");
        let _checkEmailUser = await collection.findOne({ email: userInfo.username.toLowerCase() }); 
        let _checkUsernameUser = await collection.findOne({ lowerusername: userInfo.username.toLowerCase() }); 

        if (_checkEmailUser != null)
        {
            const _passwordCheck = await bcrypt.compare(userInfo.password,_checkEmailUser.password); 
             if (_passwordCheck)
            {
                const _numero = Math.floor(Math.random()*999999);
                const _hashEmail = await bcrypt.hash("banana"+String(_numero)+_checkEmailUser.email,10); 
                await collection.updateOne({ username: _checkEmailUser.username }, { $set: { numero: _numero } });
                const _cookieSession = _checkEmailUser.username+"_"+_hashEmail;
                res.cookie('session', _cookieSession, 
                { httpOnly:true,sameSite:"Strict" } );
                res.status(200).json({message:"logged in!",body:{username:_checkEmailUser.username}});
            }
            else
            {
                res.status(418).json({message:"wrong password"});
            }
        }
        else if (_checkUsernameUser != null)
        {
            const _passwordCheck = await bcrypt.compare(userInfo.password,_checkUsernameUser.password); 
            if (_passwordCheck)
            {

                const _numero = Math.floor(Math.random()*99);
                const _hashEmail = await bcrypt.hash("banana"+String(_numero)+_checkUsernameUser.email,10); 
                const _cookieSession = _checkUsernameUser.username+"_"+_hashEmail;
                await collection.updateOne({ username: _checkUsernameUser.username }, { $set: { numero: _numero } });
               
                
                res.cookie('session', _cookieSession, 
                { httpOnly:true,sameSite:"Strict" } );
                res.status(200).json({message:"logged in!",body:{username:_checkUsernameUser.username}});
            }
            else
            {
                res.status(418).json({message:"wrong password"});
            }
        }
        else
        {
            res.status(418).json({message:"user not found"});
        }

    }
    catch (error) {
        res.status(500).json({message:error.message})
    }
    finally{
        client.close(); 
    }
} 

module.exports = loginHandler;