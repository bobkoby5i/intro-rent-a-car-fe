const express = require('express')
const router = express.Router();

const User = require('./models/model-user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


// added async to wait for bcrypt. otherwise then needed like before.
// this is option with await. 
// and genarate token
router.post('/register', async (req, res, next) => {
    console.log('POST /api/user/register - received in user.js' );
    console.log('user: ' + req.body.email);

    const hash = await bcrypt.hash(req.body.password, 10);
    console.log('hash: ' + hash);
    const newUser = new User({
        email: req.body.email,
        password: hash,
        isAdmin: 0
    });       

    User.findOne({email: req.body.email}).then(registeredUser => {
        if (registeredUser) {
            console.log('Register user failed. User already exists !')  
            res.status(409).json({message: 'Register user failed. User already exists !'});
        } else {
            console.log('saving user in mongo...');
            newUser.save().then(result => {
                console.log('Save completed.');
                let token = jwt.sign(payload, 'my_encryption_password')
                res.status(200).send({token}) 
                res.status(201).json({message:'Register new user - SUCCESS'});
            }).catch(err => { console.log(err);}) // save error catch
        }
    }).catch(err => { console.log(err);}) // find one error catch
    console.log('Register user() finished');
})


// added async to wait for bcrypt. otherwise then needed like before.
// this is option with await. 
router.post('/register2', async (req, res, next) => {
    console.log('POST /api/user/register - received in user.js' );
    console.log('user: ' + req.body.email);

    const hash = await bcrypt.hash(req.body.password, 10);
    console.log('hash: ' + hash);
    const newUser = new User({
        email: req.body.email,
        password: hash,
        isAdmin: 0
    });       

    User.findOne({email: req.body.email}).then(registeredUser => {
        if (registeredUser) {
            console.log('Register user failed. User already exists !')  
            res.status(409).json({message: 'Register user failed. User already exists !'});
        } else {
            console.log('saving user in mongo...');
            newUser.save().then(result => {
                console.log('Save completed.');
                res.status(201).json({message:'Register new user - SUCCESS'});
            }).catch(err => { console.log(err);}) // save error catch
        }
    }).catch(err => { console.log(err);}) // find one error catch
    console.log('Register user() finished');
})


// this is second better option 
router.post('/register2', (req, res, next) => {
    console.log('POST /api/user/register - received in user.js' );
    console.log('user: ' + req.body.email);

    User.findOne({email: req.body.email}).then(registeredUser => {
        if(registeredUser) {
            console.log('Register user failed. User already exists !')  
            res.status(400).json({message: 'Register failed. User already exiss.'});
        } else {
            bcrypt.hash(req.body.password, 10).then(hash =>{
                const user = new User({
                    email: req.body.email,
                    password: hash,
                    isAdmin: 0
                });   
                console.log('saving user in mongo...');
                user.save().then(result => {
                    console.log('saved');
                    res.status(201).json({message:'User register SUCCESS. Response from nodeJs as json'});
                }).catch(err => {console.log(err)})
            })
        } 
    }).catch(err => { console.log(err);}) // find one error catch
})



// I think this is bad 2021-11-01
router.post('/register1_old', (req, res, next) => {
    console.log('POST /api/user/register - received in user.js' );
    console.log('user: ' + req.body.email);

    User.findOne({email: req.body.email}).then(user => {
        fetcheduser = user;
        if(fetcheduser) {
          return res.status(400).json({message: 'Register failed. User already exiss.'});
        }
        return bcrypt.hash(req.body.password, 10)
    }).then(hash =>{
        const user = new User({
            email: req.body.email,
            password: hash,
            isAdmin: 0
          });   
        console.log('saving user in mongo...');
        user.save().then(result => {
            console.log('saved');
            res.status(201).json({message:'User register SUCCESS. Response from nodeJs as json'});
        }).catch(err => {
            console.log(err);
        })
    })

    //res.send('Hello from Server GET /api/user/register')
    //res.status(201).json({message: 'User register SUCCESS. Never should get here'});
})


router.post('/login', (req, res, next) => {
    console.log('POST /api/user/login - received in user.js' );
    console.log('user: ' + req.body.email);
    let fetcheduser;
    const p_email = req.body.email
    const p_pass = req.body.password
    User.findOne({email: p_email}).then(user => {
        console.log('email: ' + p_email);
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
        const p_token = jwt.sign({email: fetcheduser.email, userId: fetcheduser._id, isAdmin: p_isAdmin},p_sign_secret, {expiresIn:'1h'});
        const p_expires = 3600
        console.log('token:'+p_token);   
        return res.status(200).json({token:p_token, expiresIn: p_expires, admin:p_isAdmin}) 

    }).catch(err =>{
        console.log(err);
    });
    
});
 
 
module.exports = router;
