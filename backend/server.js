const express = require ('express')
const bodyParser = require('body-parser')
//const path = require ('path')


const port = process.env.PORT || 3000;
const server = express()
server.use(express.json());
//server.use(bodyParser.json())
server.use(express.urlencoded({extended: false}));

const app = require('./app'); // refers to ./backedn/app.js
server.use('/api', app);
const path = require('path');
console.log('__dirname: ' + __dirname);    
console.log('static content 1: ' + path.join(__dirname, '/dist'));
console.log('static content 2: ' + path.join(__dirname, '/rent-a-car-fe/dist'));


if (process.env.NODE_ENV === "production"){
    console.log('PROD -> server static content under: ' + path.join(__dirname, '/rent-a-car-fe/dist'));
    server.use(express.static(path.join(__dirname, '/rent-a-car-fe/dist')))
    server.use('/icons', express.static(path.join(__dirname, '/assets/icons')))
    server.use('/uploads', express.static(path.join(__dirname, '/be_uploads')))
    server.use('/cars', express.static(path.join(__dirname, '/assets/cars')))

    server.use('/images',express.static(path.join(__dirname, '/rent-a-car-fe/src/assets/images')))
    server.use('/js',express.static(path.join(__dirname,'/rent-a-car-fe/src/assets/js')))
    server.use('/css',express.static(path.join(__dirname,'/rent-a-car-fe/src/assets/css')))
    server.use('/fonts',express.static(path.join(__dirname,'/rent-a-car-fe/src/assets/fonts')))
} else {
    console.log('NON PROD -> run ng serve');
    server.use(express.static('rent-a-car-fe/dist'))
    server.use('/icons',express.static('assets/icons'))
    server.use('/uploads',express.static('be_uploads'))
    server.use('/cars',express.static('assets/cars'))
    server.use('/images',express.static('rent-a-car-fe/src/assets/images'))
    server.use('/js',express.static('rent-a-car-fe/src/assets/js'))
    server.use('/css',express.static('rent-a-car-fe/src/assets/css'))
    server.use('/fonts',express.static('rent-a-car-fe/src/assets/fonts'))
}


//app.use('/tmp', express.static(path.join(__dirname, 'tmp'))); 
app.use('/tmp', express.static( '/tmp')); 

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


 
 






 
 
