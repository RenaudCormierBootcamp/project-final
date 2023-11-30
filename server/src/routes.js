const express = require('express');
const router = express.Router();

const loginHandler = require('./handlers/loginHandler');
const createUser = require('./handlers/createUser');
const autoLoginHandler = require('./handlers/autoLoginHandler');

router.use(express.json()); 

router.post('/login', loginHandler);  
router.get('/autologin', autoLoginHandler);  
router.post('/register', createUser); 



router.all("*", (req, res) => {
    res.status(404).json({
    status: 404,
    message: "wrong endpoint. point to another end",
    });
})

module.exports = router;
