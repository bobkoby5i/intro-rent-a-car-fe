const express = require('express')
const router = express.Router();

const User = require('./models/model-user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


 
router.post('/register', (req, res, next) => {
    console.log('POST /api/user/register - received in user.js' );
    console.log('user: ' + req.body.email);
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash, 
            isAdmin: 0 
        });
        user.save().then(result => {
            res.status(200).json({message:'User Created'});
        }).catch(err => {
            console.log(err);
        })
    })
    //res.send('Hello from Server GET /api/user/register')
    res.status(201).json({message: 'User register SUCCESS. Response from nodeJs as json'});
})
 
module.exports = router;
