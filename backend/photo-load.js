const express = require('express')
const router = express.Router();
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");
const Car = require('./models/model-car')

const mongo_uri = process.env.MONGO_RENT_A_CAR_URI || "mongodb://localhost:27017/intro-rent-a-car";

let gfs;

let API_URL;
let PHOTO_STORED_BEFORE;
let PHOTO_STORED_BEFORE_URL;


if (process.env.NODE_ENV === "production"){
    API_URL = "https://koby5i-intro-rent-a-car.herokuapp.com/api"
} else {
    API_URL = "http://localhost:3000/api"
}


const gfs_storage = new GridFsStorage({
    url: mongo_uri,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {

        console.log('HERE 1');
        console.log('HERE 2');
        return {
            bucketName: "photos",
            //filename: `${Date.now()}-any-name-${file.originalname}`,
            filename: file.originalname,
        };
    },
});


const conn = mongoose.connection;

conn.once("open", function () {
    console.log("Open connection for gfs. collection photos.")
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});

const file_filter = async (req, file, cb) => {
    PHOTO_STORED_BEFORE = false
    const match = ["image/png"];
    console.log(file.originalname);
    if (match.indexOf(file.mimetype) === -1) {
        console.log("file type not supported: " + file.mimetype);
        console.log("REJECT");
        // reject 
        cb(null,false)
        //cb(new Error("File type not supported sorry."),false)
    } 

    try {
        console.log("LOOKKING ..." + file.originalname);
        await gfs.files.findOne({ filename: file.originalname}).then(result => {
            if (!result) {
                console.log("ACCEPT NEW FILE because not stored before.");        
                cb(null,true)        
            } else {
                console.log("SUCH FILE ALREADY EXISTS");
                console.log(result)
                PHOTO_STORED_BEFORE = true
                PHOTO_STORED_BEFORE_URL =  `${API_URL}/${file.originalname}`
                console.log("DO NOT STORE")
                cb(null,false)    
            }
        })
    } catch (error) {
        console.log(error);
        res.send("ERROR");
        cb(null,false)    
    }    
}

const gfs_upload = multer({
    storage: gfs_storage, 
    limits:{
        fileSize: 1024 * 100 // 100kB
    },
    fileFilter: file_filter
})



router.post("/upload", gfs_upload.single("file"), (req, res) => {
    console.log("upload()")
    console.log(req.body)
    if ((req.file === undefined) && (!PHOTO_STORED_BEFORE)) {
        console.log("FILE IS EMPTY. not stored before.")
        res.status(400).json("file was not stored.");
    }
    if (req.file === undefined) {
        console.log("FILE IS EMPTY. Stored before.")
        const imgUrl = PHOTO_STORED_BEFORE_URL;
        res.status(200).json({message: 'Image received. - OK Already exists.',imgUrl:imgUrl});
    } else {
        console.log("FILE STORED")
        console.log(req.file)
        console.log(req.file.filename)
        const imgUrl = `${API_URL}/${req.file.filename}`;
        console.log(imgUrl);
        const car = new Car({
            _id: new mongoose.Types.ObjectId(),
            brand: req.body.brand,
            model: req.body.model,
            power: req.body.power,
            seats: req.body.seats,
        });
        console.log(car);
        res.status(201).json({message: 'Image received and stored - SUCCESS.',imgUrl:imgUrl});
    }

    //res.status(201).send(json({imgUrl:imgUrl}));
    //res.send(imgUrl)
});


router.get("/:filename", async (req, res) => {
    console.log("Fetch from mongo filename: " + req.params.filename)
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        console.log(file)
        console.log(gfs)
        const readStream = gfs.createReadStream(file.filename);
        //const readStream = gfs.createReadStream({_id:  mongoose.Types.ObjectId("617dfc7b39ed97ca4f822597") });
        readStream.on('error', function (err) {
            console.log('An error occurred!', err);
            throw err;
          });        
        readStream.pipe(res);
    } catch (error) {
        console.log(error);
        res.send("not found");
    }
});


router.delete("/:filename", async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.send("success");
    } catch (error) {
        console.log(error);
        res.send("An error occured.");
    }
});


 
module.exports = router;
