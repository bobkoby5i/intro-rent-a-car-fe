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
const path = require('path');
console.log('__dirname: ' + __dirname);    
console.log('static content 1: ' + path.join(__dirname, '/dist'));
console.log('static content 2: ' + path.join(__dirname, '/rent-a-car-fe/dist'));


if (process.env.NODE_ENV === "production"){
    console.log('PROD -> server static content under: ');
    server.use(express.static(path.join(__dirname, '/dist')))
} else {
    console.log('NON PROD -> run ng serve');
    server.use(express.static('rent-a-car-fe/dist'))
}

//server.use(express.static('rent-a-car-fe/dist'))

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


 
 






 
 
