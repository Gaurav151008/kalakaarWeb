const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    artistId:{
        type: String,
        required: true,
    },
    file:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    caption:{
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('post',postSchema);