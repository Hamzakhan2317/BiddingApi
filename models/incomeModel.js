const mongoose = require('mongoose');

//Income Schema
const incomeSchema = mongoose.Schema({
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

const Income = mongoose.model('income', incomeSchema);
module.exports = Income