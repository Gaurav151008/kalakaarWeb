const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    contact:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: false,
    },
    profession:{
        type: String,
        required: false,
    },
    budget:{
        type: String,
        required: false,
    },
    description:{
        type: String,
        required: false,
    },
    achivements:{
        type: String,
        required: false,
    },
    profilephoto:{
        type: String,
        required: false,
    },
    profilevideo:{
        type: String,
        required: false,
    },
    
    completed:{
        type: Boolean,
        default: false,
    },

});

module.exports = mongoose.model('artists',artistSchema);