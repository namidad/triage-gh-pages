const mongoose = require('mongoose');

const rescuerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    rescuerID: String,
    teamID: String,
    deviceName: String,
    reports: [{
        timestamp: Number,
        rescuerID : String,
        priority: String,
        sensorData: {
                timestamp: Number,
                pulse: Number,
                saturation: Number,
                breathPerMinute: Number
        },
        latitude: Number,
        longitude: Number,
        comment: String
    }]
});

module.exports = mongoose.model('Rescuer', rescuerSchema);