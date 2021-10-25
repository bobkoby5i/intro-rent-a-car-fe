
const express = require('express')
const router = express.Router();
const multer = require('multer')
//const temp_folder = './tmp/uploads';
const temp_folder = '/tmp';
const Car = require('./models/model-car')


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
    res.status(201).json({message: 'Image save received not saved  - SUCCESS.'});
})

router.post('/create-car', (req, res, next) => {
    const car_brand = req.body.brand;
    const car_model = req.body.model;
    const car_power = req.body.power;
    const car_seats = req.body.seats;
    const imgUrl    = req.body.imgUrl;

    const car = new Car({
        brand : req.body.brand,
        model : req.body.model,
        power : req.body.power,
        seats : req.body.seats,
        imgUrl: req.body.imgUr
    });   

    console.log('POST /api/cars/create-car - received in admin.js ' + 
                " car brand: " + car_brand +
                " car model: " + car_model +
                " car power: " + car_power +
                " car seats: " + car_seats + 
                " car url  : " + imgUrl );

    console.log('saving car in mongo...');
    car.save().then(result => {
        console.log('saved');
        res.status(201).json({message:'cars.js: Car save OK'});
    }).catch(err => {
        console.log(err);
    })
})



 
module.exports = router;
