const express = require('express')
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express.Router()
const mongoose = require('mongoose')
// SET "MONGO_RENT_A_CAR_URI=mongodb+srv://intro-rent-a-car-user:<password>@<dbname>.tlx1x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const mongo_uri = process.env.MONGO_RENT_A_CAR_URI || "mongodb://localhost:27017/intro-rent-a-car";
//const appbe = express();


// mongoose.connect(mongo_uri, err=> {
//     if (err) {
//         console.error('Error' + err)
//     } else {
//         console.log('Connected to mongodb')
//     }
// })

mongoose.connect(mongo_uri, {useNewUrlParser: true}).then(() => {
    console.log('Connected to mongodb')
}).catch(err => console.log(err))



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
const adminRoutes = require('./admin'); //reference to ./admin.js
const photoRoutes = require('./photo-load'); //reference to ./user.js
app.use('/user', userRoutes)
app.use('/admin', adminRoutes)
app.use('/photo', photoRoutes)


module.exports = app;



