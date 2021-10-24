const express = require('express')
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express.Router()
//const appbe = express();

app.use(cors())
app.use(bodyparser.json())

app.get('/hello', function(req, res){
    console.log('GET /api/hello from app.js');
    res.send('GET /api/hello from app.js')
})

app.get('/',(req, res,next) => {
    console.log('GET /api from app.js');
    res.send('This a response from app.js')
});


const userRoutes = require('./user'); //reference to ./user.js
app.use('/user', userRoutes)

module.exports = app;

