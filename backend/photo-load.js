const express = require('express')
const router = express.Router();
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");

const mongo_uri = process.env.MONGO_RENT_A_CAR_URI || "mongodb://localhost:27017/intro-rent-a-car";

let gfs;


const gfs_storage = new GridFsStorage({
    url: mongo_uri,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        console.log("inside GridFsStorage")

        if (match.indexOf(file.mimetype) === -1) {
            //const filename = `${Date.now()}-any-name-${file.originalname}`;
            const filename = file.originalname;
            console.log(filename);
            return filename;
        }
        console.log('HERE');
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

const gfs_upload = multer({
    storage: gfs_storage
})




router.post("/upload", gfs_upload.single("file"), (req, res) => {
    console.log("upload()")
    if (req.file === undefined) res.send("you must select a file.");
    console.log(req.file)
    console.log(req.file.filename)
    const imgUrl = `http://HOST:PORT/photo/${req.file.filename}`;
    //res.status(201).send(json({imgUrl:imgUrl}));
    //res.send(imgUrl)
    res.status(201).json({message: 'Image save received  saved  - SUCCESS.',imgUrl:imgUrl});
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
