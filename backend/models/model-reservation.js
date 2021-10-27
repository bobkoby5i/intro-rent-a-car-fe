const mongoose = require('mongoose')
const reservationSchema = mongoose.Schema({
    carId: String,
    from: String,
    till: String
});


module.exports = mongoose.model('Reservation', reservationSchema)