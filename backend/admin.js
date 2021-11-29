
const express = require('express')
const router = express.Router();
const multer = require('multer')
//const temp_folder = './tmp/uploads';  // tmo excluded from git - works
//const temp_folder = '/tmp';           // works on c:/tmp
const temp_folder = './assets/uploads'; // works relative this is folder which is pushed to repo and heroku

const Car = require('./models/model-car')
const User = require('./models/model-user')
const Reservation = require('./models/model-reservation')
const verifyToken = require('./verify-token')



const storage = multer.diskStorage({
    destination: function(req, file, cb){
        //console.log("destination  : " + temp_folder);
        cb(null, temp_folder);
    },
    filename: function (req, file, cb){
        //console.log("filename tmp : " + "xxx");
        //console.log("filename     : " + file.originalname);
        cb(null, file.originalname)
    }
})


const upload = multer({
        storage: storage
})
 
router.post('/save-image', verifyToken, upload.single('file'), (req, res) => {

    console.log('admin.js: received POST /api/admin/save-image' );
    res.status(201).json({message: 'Image save received  saved  - SUCCESS.'});
})

router.post('/create-car', verifyToken, (req, res, next) => {
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

router.get('/users', verifyToken, (req, res, next) => {
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

router.get('/users2',  (req, res, next) => {
    console.log('admin.js: received GET /api/admin/users2' );
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

router.get('/cars', (req, res, next) => {
    console.log('admin.js: received GET /api/admin/cars' );
    // select * from acars
    Car.find({}).then( cars => {   
        if (!cars) {
            res.status(404).json({message: 'GET users - no cars'});
        }
        res.status(200).json(cars);
    }).catch(error => {
        console.log(error);
    })
})


router.delete('/cars/:id', verifyToken, (req, res, next) => {
    const car_id = req.params.id
    console.log('admin.js: received DELETE /api/admin/cars/'+ car_id );
    //res.status(200).json({id:user_id});
    Car.deleteOne({_id:car_id}).then(response => {
        Car.find({}, ).then( cars => {   
            if (!cars) {
                res.status(404).json({message: 'No cars'});
            }
            res.status(200).json(cars);
        }).catch(error => {console.log(error)})
    }).catch(error => {console.log(error)})
})


router.delete('/delete-user/:id', verifyToken, (req, res, next) => {
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

router.patch('/make-admin/:id', verifyToken, (req, res, next) => {
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


router.post('/cars', verifyToken, (req, res) => {
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


router.post('/reserve/:id', verifyToken, (req, res) => {
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


router.get('/reservations', verifyToken, (req, res, next) => {
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


router.delete('/reservations/:id', verifyToken, (req, res, next) => {
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
