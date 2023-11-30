const { MongoClient } = require("mongodb");  
const bcrypt = require('bcrypt');
require("dotenv").config();  

const { MONGO_URI } = process.env;  
const options = {  
    useNewUrlParser: true,
    useUnifiedTopology: true,
}; 

const autoLoginHandler = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        const db = client.db("userinfo");  
        const _cookie =  req.get("cookie");
        const collection = db.collection("users"); 
        if (!_cookie)
        {
            res.status(100).json({message:"no session found, register or login"}); 
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
                    res.status(200).json({message:"logged in!",body:{username:_checkUsernameUser.username}});
                }
                else
                {    
                    res.clearCookie("session");
                    res.status(418).json({message:"session error, please login again"}); 
                }
            }
        }
        else
        {
            res.clearCookie("session");
            res.status(100).json({message:"no session found, register or login"}); 
        }

 
    }
    catch (error) {
        res.status(500).json({message:error.message})
    }
    finally{
        client.close(); 
    }
} 

module.exports = autoLoginHandler;