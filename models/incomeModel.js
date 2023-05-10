const mongoose = require('mongoose');

//Income Schema
const incomeSchema = mongoose.Schema({
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

const Income = mongoose.model('income', incomeSchema);
module.exports = Income