const mongoose = require('mongoose');

const victimsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    color: String,
    lat: Number,
    lng: Number,
    injury: String,
});

module.exports = mongoose.model('Victims', victimsSchema);