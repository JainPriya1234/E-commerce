const mongoose = require('mongoose');
const validator = require('validator');
otpschema = new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    otp: {
      type: String,
      require: true,
    }
  }
  )  
  
module.exports = mongoose.model("otpsend",otpschema);
