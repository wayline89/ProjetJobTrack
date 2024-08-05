const mongoose = require("mongoose");
const User = require("../models/user");
const Offer = require("../models/offer");
const { isEmail, isURL } = require("validator");
const bcrypt = require("bcrypt");



module.exports.dashboard_get = async (req, res) => {
  const offers = await Offer.find({});

  res.render("dashboard", { offers });
};
