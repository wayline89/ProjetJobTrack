const mongoose = require("mongoose");
const User = require("../models/user");
const Offer = require("../models/offer");
const { isEmail, isURL } = require("validator");
const bcrypt = require("bcrypt");
const { name } = require("ejs");


module.exports.dashboard_get = async (req, res) => {
  const offers = await Offer.find({}).sort({status: -1});

  res.render("dashboard", { offers });
};

