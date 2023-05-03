const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

userschemma = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
    // validate: [
    //     /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ ,
    //     'invalid email! ',
    // ]

  },
  password: {
    type: String,
    required: true
  },
  isverified: {
    type : String,
    default : false
  }
})


module.exports = mongoose.model("message", userschemma);
