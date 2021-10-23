const express = require ('express')
const bodyParser = require('body-parser')
//const path = require ('path')


const port = process.env.PORT || 3000;
const app = express()
app.use(express.json());
//app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}));

const apiapp = require('./backend/api-app'); // refers to ./backedn/app.js
app.use('/api', apiapp);
app.use(express.static('rent-a-car-fe/dist'))
app.get('/hello', function(req, res){
    console.log('GET /hello');    
    res.send('Hello from Server')
})


console.log('Starting server on localhost:' + port)
//server.listen(port);
// app.listen(port, function(){
//     console.log('Server running on localhost:' + port)
// })
app.listen(port, console.log('Server running on localhost:' + port))


 
 






 
 
