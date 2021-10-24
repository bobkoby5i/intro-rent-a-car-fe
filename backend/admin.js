const express = require('express')
const router = express.Router();
const multer = require('multer')
//const temp_folder = './tmp/uploads';
const temp_folder = '/tmp';

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        console.log("destination  : " + temp_folder);
        cb(null, temp_folder);
    },
    filename: function (req, file, cb){
        console.log("filename tmp : " + "xxx");
        console.log("filename     : " + file.originalname);
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
