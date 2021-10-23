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


router.post('/login', (req, res, next) => {
    console.log('POST /api/user/login - received in user.js' );
    console.log('user: ' + req.body.email);
    let fetcheduser;
    const p_email = req.body.email
    const p_pass = req.body.password
    //User.findOne({email: p_email}).then(user => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        console.log('pass: ' + hash);
        const user = new User({
            _id: "1234567890",
            email: "a@a.com",
            //password = "password"
            password: "$2a$10$8ckbvK6KPK.JP1EVwEDsZugWo1YJMGr.HHDvWkEOlHI6CFHLPaI9W",
            isAdmin: 0
        });

        if (!user) {
            console.log('Auth failed: User not found.');
            return res.status(401).json({message:"Auth failed: User not found."}) 
        }
        fetcheduser = user;
        console.log('user found. checking passwd');
        return bcrypt.compare(p_pass, user.password)
    }).then(result => {
        if (!result){
            console.log('Auth failed: Password does not match.');
            return res.status(401).json({message:"Auth failed: Password does not match."}) 
        }
        console.log('user found. passwd OK. generate token');        
        const p_sign_secret = "jwt_secret"
        const p_isAdmin = fetcheduser.isAdmin;
        const p_token = jwt.sign({email: fetcheduser.email, userId: fetcheduser.isAdmin._id},p_sign_secret, {expiresIn:'1h'});
        const p_expires = 3600
        console.log('token:'+p_token);   
        return res.status(200).json({token:p_token, expiresIn: p_expires, admin:p_isAdmin}) 

    }).catch(err =>{
        console.log(err);
    });
    
});
 
 
module.exports = router;
