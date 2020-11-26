const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userName: {
    type:String
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = new mongoose.model('User', userSchema);
