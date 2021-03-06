const mongoose = require('mongoose');

const victimSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    currentPriority: String,
    state: String,
    victimID: Number,
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
    }],
    sensorReads : [{
        timestamp: Number,
        pulse: Number,
        saturation: Number,
        breathPerMinute: Number
    }]
});

module.exports = mongoose.model('Victim', victimSchema);