const mongoose = require('mongoose');

//Account Schema
const accountSchema = mongoose.Schema({
    name: {
        type: String,
        max: 255,
        require: true,
        unique: true
    },
    balance: {
        type: Number,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

//export module

const Account = mongoose.model('account', accountSchema);
module.exports = Account