const mongoose = require("mongoose");
const User = require("../models/user");
const Offer = require("../models/offer");
const { isEmail, isURL } = require("validator");
const bcrypt = require("bcrypt");
const { name } = require("ejs");


module.exports.dashboard_get = async (req, res) => {
  const offers = await Offer.find({}).sort({status: -1});
console.log('ryrezkry')
  res.render("dashboard", { offers });
};

// Delete a offer
module.exports.delete_offer =  async (req, res) => {
  const { id } = req.params;
  console.log('dfge' + id);
  try {
    const offer = await Offer.findByIdAndDelete(id);
    res.send(offer);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};