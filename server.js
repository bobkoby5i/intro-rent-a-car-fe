const express = require ('express')
const bodyParser = require('body-parser')
//const path = require ('path')


const port = process.env.PORT || 3000;
const server = express()
server.use(express.json());
//server.use(bodyParser.json())
server.use(express.urlencoded({extended: false}));

const app = require('./backend/app'); // refers to ./backedn/app.js
server.use('/api', app);
server.use(express.static('rent-a-car-fe/dist'))
server.get('/hello', function(req, res){
    console.log('GET /hello');    
    res.send('Hello from Server')
})


console.log('Starting server on localhost:' + port)
//server.listen(port);
// app.listen(port, function(){
//     console.log('Server running on localhost:' + port)
// })
server.listen(port, console.log('Server running on localhost:' + port))


 
 






 
 
