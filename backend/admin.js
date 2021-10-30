
const express = require('express')
const router = express.Router();
const multer = require('multer')
//const temp_folder = './tmp/uploads';
const temp_folder = '/tmp';
const Car = require('./models/model-car')
const User = require('./models/model-user')
const Reservation = require('./models/model-reservation')


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

    console.log('admin.js: received POST /api/admin/save-image' );
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
        imgUrl: req.body.imgUrl
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

router.get('/users', (req, res, next) => {
    console.log('admin.js: received GET /api/admin/users' );
    // select email, isAdmin from users
    User.find({}, 'email isAdmin').then( users => {   
        if (!users) {
            res.status(404).json({message: 'GET users - no users'});
        }
        res.status(200).json(users);
    }).catch(error => {
        console.log(error);
    })
})

router.delete('/delete-user/:id', (req, res, next) => {
    const user_id = req.params.id
    console.log('admin.js: received DELETE /api/admin/delete-user/'+ user_id );
    //res.status(200).json({id:user_id});
    User.deleteOne({_id:user_id}).then(response => {
        User.find({}, 'email isAdmin').then( users => {   
            if (!users) {
                res.status(404).json({message: 'GET users - no users'});
            }
            res.status(200).json(users);
        }).catch(error => {console.log(error)})
    }).catch(error => {console.log(error)})
})

router.patch('/make-admin/:id', (req, res, next) => {
    const user_id = req.params.id;
    const p_isAdmin = req.body.isAdmin;
    console.log('admin.js: received PATCH /api/admin/make-admin/'+ user_id );
    User.updateOne({_id:user_id},{$set: {isAdmin:p_isAdmin}}, {new: true}).then(response => {
        User.find({}, 'email isAdmin').then( users => {   
            if (!users) {
                res.status(404).json({message: 'GET users - no users'});
            }
            res.status(200).json(users);
        }).catch(error => {console.log(error)})
    }).catch(error => {console.log(error)})
})


router.post('/cars', (req, res) => {
    console.log(req.body)
    Reservation.find().or([{$and: [{from: {$lte: req.body.car_from}},{till: {$gte: req.body.car_from}}] },
            {$and: [{from: {$lte: req.body.car_till}},{till: {$gte: req.body.car_till}}] },
            {$and: [{from: {$gte: req.body.car_from}},{till: {$lte: req.body.car_till}}] } ]).then(cars => {
                console.log("find() cars[0] ", cars )
                if (cars[0] === undefined) {
                    console.log("undefined ok. then get all cars.... " )
                    Car.find().then(car =>{
                        res.status(200).json(car)
                    }).catch(error => console.log(error))
                } else {
                    console.log("cars[0]. then get all cars.... " )
                    Car.find({_id: {$ne: cars[0].car._id}}).then(cars => {
                        res.status(200).json(cars)
                    }).catch(error => console.log(error))
                }
            })
});


router.post('/reserve/:id', (req, res) => {
    console.log(req.body)
    const car_id = req.params.id;
    const reserve = new Reservation ({
        car_id:   car_id,
        from:     req.body.from,
        till:     req.body.till,
        fromDate: req.body.fromDate,
        tillDate: req.body.tillDate
    });
    console.log('admin.js: received POST /api/admin/reserve/'+ car_id );
    reserve.save().then(result =>{
        res.status(201).json({message:"Booked from", 
                             car_id: car_id,
                             from:   req.body.from,
                             till:   req.body.till });
    }).catch(err => {
        console.log(err);
    })
    
});


router.get('/reservations', (req, res, next) => {
    console.log('admin.js: received GET /api/admin/reservations' );
    // select email, isAdmin from users
    Reservation.find({}, '_id car_id fromDate tillDate').then( reservations => {   
        if (!reservations) {
            res.status(200).json([]);
        }
        res.status(200).json(reservations);
    }).catch(error => {
        console.log(error);
    })
})


router.delete('/reservations/:id', (req, res, next) => {
    const reservation_id = req.params.id
    console.log('admin.js: received DELETE /api/admin/reservations/'+ reservation_id );
    //res.status(200).json({id:user_id});
    Reservation.deleteOne({_id:reservation_id}).then(response => {
        //res.status(200).json(response);
        Reservation.find({}, '_id car_id fromDate tillDate').then( reservations => {   
            if (!reservations) {
                res.status(200).json([]);
            }
            res.status(200).json(reservations);
        }).catch(error => {console.log(error)})
    }).catch(error => {console.log(error)})
})



module.exports = router;
