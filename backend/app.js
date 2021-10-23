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


app.use((req, res,next) => {
    console.log('GET * This a response from app.js');
    res.send('GET * This a response from app.js')
});


module.exports = app;

