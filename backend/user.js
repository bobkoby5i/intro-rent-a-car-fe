const express = require('express')
const router = express.Router();
 
router.post('/register', (req, res, next) => {
    console.log('POST /api/user/register received in user.js')
    //res.send('Hello from Server GET /api/user/register')
    res.status(201).json({message: 'User register SUCCESS. Response from nodeJs as json'})
    //res.send.json({message: 'Response from nodeJs as json'})
})
 
module.exports = router;
