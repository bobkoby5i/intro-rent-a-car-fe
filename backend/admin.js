const express = require('express')
const router = express.Router();

 
router.post('/saveimage', (req, res, next) => {
    console.log('POST /api/admin/saveimage - received in admin.js' );
    res.status(201).json({message: 'Image save - SUCCESS.'});
})

 
module.exports = router;
