const express = require ('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');
 
 
const PORT = process.env.PORT || 4200
//const api = require('./routes/api')
const app = express()
app.use(cors())
 
app.use(bodyParser.json())
//app.use(express.static(__dirname + '/dist/intro-rent-a-car'));
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
 
//app.use('/api', api)
app.get('/hello', function(req, res){
    res.send('Hello from NodeJS Server on Heroku with Angular')
})
 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));           // works
    //res.sendFile(path.join(__dirname, 'dist/bike-ui/index.html')); // does not work
    //res.sendFile('index.html', {root: './dist/bike-ui'});          // does not work
  });
 
app.listen(PORT, function(){
    console.log('Server running on localhost:' + PORT)
})
