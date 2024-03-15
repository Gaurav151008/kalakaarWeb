const mongoose = require('mongoose');

const appliedSchema = new mongoose.Schema({
    artistId:{
        type: String,
        required: true,
    },
    workId:{
        type: String,
        required: true,
    },
    praposal:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        default: false,
    },
    recId:{
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('applied',appliedSchema);