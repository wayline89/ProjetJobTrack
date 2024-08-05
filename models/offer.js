const mongoose = require("mongoose");
const { isEmail, isURL } = require('validator');
const bcrypt = require('bcrypt');

const offerSchema = new mongoose.Schema({

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  
  title: { type: String, required: [true, "Please enter a title"] },
  company: { type: String },
  website: { type: String },
  contact: {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
  },
  origin: { type: String },
  status: { type: String },
  comments: { type: String },
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
