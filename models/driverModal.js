const mongoose = require('mongoose');

//driverSchema Schema
const driverSchema = mongoose.Schema({
    departureLocation: {
        type: String,
        require: true,
    },
    vehicleType: {
        type: String,
        require: true,
    },
    noOfSeats: {
        type: Number,
        require: true,
    },
    userId: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//export module

const Driver = mongoose.model('driver', driverSchema);
module.exports = Driver