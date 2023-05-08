const mongoose = require('mongoose');

//Transfer Schema
const transferSchema = mongoose.Schema({
    name: {
        type: String,
        max: 255,
        require: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

//export module

const Transfer = mongoose.model('transfer', transferSchema);
module.exports = Transfer