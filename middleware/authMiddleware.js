const jwt = require("jsonwebtoken");
const User = require('../models/user');
const Offer = require('../models/offer');


const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  //check json web token exist & is verified

  if (token) {
    jwt.verify(token, "net ninja secret", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

//check current user

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "net ninja secret", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

  // check current offers
  const checkOffers = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
        if (err) {
          res.locals.offers = null;
          next();
        } else {
          let user = await User.findById(decodedToken.id);
          let offers = await Offer.find({user: user._id});
          // console.log("offers: ", offers);
          res.locals.offers = offers;
          next();
        }
      });
    } else {
      res.locals.offers = null;
      next();
    }
  };
  module.exports = { requireAuth, checkUser, checkOffers };
