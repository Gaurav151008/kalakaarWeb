const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  artistId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Artist' },
  recruiterId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Recruiter' },
  sender: { 
    type: String, 
    required: true, 
    enum: ['recruiter', 'artist'] // Restricting values to either 'recruiter' or 'artist'
  },
  message: { 
    type: String, 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    default: 'unread', 
    enum: ['unread', 'read', 'delivered']  // Optional field for message status
  }
});

// Create the model
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
