const mongoose = require("mongoose");
const User = require("../models/user");
const Offer = require("../models/offer");
const { isEmail, isURL } = require("validator");
const bcrypt = require("bcrypt");
const { name } = require("ejs");


// module.exports.dashboard_get = async (req, res) => {
//   const offers = await Offer.find({}).sort({status: -1});
// console.log('ryrezkry')
//   res.render("dashboard", { offers });
// };


module.exports.dashboard_get = async (req, res) => {
  const {id} =  req.params;
  console.log("coucblalalalalalou" + id) 

  try {
    const offers = await Offer.find({ id }).sort({ title: 1 });
    console.log('Offers fetched for user:', id);
    res.render("dashboard", { id })
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).send('Error fetching offers');
  }
};


// Delete an offer
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