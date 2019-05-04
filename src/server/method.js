const mongoose = require('mongoose');

const methodSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    isUsed: Boolean
});

module.exports = mongoose.model('Methods', methodSchema);