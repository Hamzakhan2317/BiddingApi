const mongoose = require('mongoose');

//Transfer Schema
const transferSchema = mongoose.Schema({
    desc: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    amount: {
        type: Number,
        require: true,
    },
    transcationType: {
        type: String,
        require: true,
    },
    accountId: {
        type: String,
        require: true,
    },
    toAccountId: {
        type: String,
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

const Transfer = mongoose.model('transfer', transferSchema);
module.exports = Transfer