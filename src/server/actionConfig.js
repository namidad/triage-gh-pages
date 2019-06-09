const mongoose = require('mongoose');

const actionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    triageMethod: String,
    victimsNum: Number,
    rescuersNum: Number,
    isUsed: Boolean
});

module.exports = mongoose.model('Actionconfig', actionSchema);