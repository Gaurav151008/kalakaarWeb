const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    duration:{
        type: String,
        required: true,
    },
    budget:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    recId:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('work',workSchema);