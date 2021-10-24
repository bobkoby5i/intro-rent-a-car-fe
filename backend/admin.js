const express = require('express')
const router = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(re, file, cb){
        cb(null, './tmp/uploads');
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
})


const upload = multer({
        storage: storage
})
 
router.post('/save-image', upload.single('file'), (req, res) => {
    console.log('POST /api/admin/save-image - received in admin.js' );
    res.status(201).json({message: 'Image save - SUCCESS.'});
})

 
module.exports = router;
