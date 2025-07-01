const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({

    results: {
        title: String,
        link: String,
        snippet: String,
            displayLink: String
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    });

    module.exports = mongoose.model('History', historySchema);