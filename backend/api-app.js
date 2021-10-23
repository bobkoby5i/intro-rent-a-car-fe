const express = require('express')
const router = express.Router()
//const appbe = express();

router.get('/hello', function(req, res){
    console.log('GET /api/hello from app.js');
    res.send('GET /api/hello from app.js')
})


router.use((req, res,next) => {
    console.log('GET * This a response from app.js');
    res.send('GET * This a response from app.js')
});


module.exports = router;

