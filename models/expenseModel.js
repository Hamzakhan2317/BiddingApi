const mongoose = require('mongoose');

//Expense Schema
const expenseSchema = mongoose.Schema({
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

const Expense = mongoose.model('expense', expenseSchema);
module.exports = Expense