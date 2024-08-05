const mongoose = require('mongoose');
const User = require('../models/user');
const Offer = require('../models/offer');

const jwt = require('jsonwebtoken');



//handle errors
const handleErrors = (err) => {
    console.log("in handle errors");
    console.log("err.message :", err.message, "err.code : ", err.code);
    let errors = {
      title: "",
      company: "",
      website: "",
      contact: {
        name: "",
        email: "",
        phone: "",
        address: "",
      },
      origin: "",
      status: "",
      comment: "",
    };
  
    //I need to handle the errors.
    if (err.message.includes("Offer validation failed")) {
      Object.values(err.errors).forEach((error) => {
        errors[error.path] = error.message;
      });
    console.log("object.values.(err.errors)", Object.values(err.errors));
    }
    console.log("err :",err);
  
    return errors;
  };

  module.exports.create_offer_post = async (req, res) => {

    const token = req.cookies.jwt
    console.log(req.body);
    const offerData = req.body
    if (token) {
        try {
            jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
                if (err) {
                    console.log(err.message);
                    } else {
                        try {
                            let user = await User.findById(decodedToken.id)
                            const offer = new Offer({...offerData, user : user.id})
                            await offer.save()
                            user.offers.push(offer._id)
                            await user.save()
                            res.status(201).json({ offer: offer._id });
                        } catch (error) {
                            console.log(`An error occured when attempting to find the user by his ID, or when creating and saving the offer, or when saving the id of the offer in the user, or when saving the user : ${error}`);
                            const errors = handleErrors(error);
                            console.log("errors: ", errors);
                            res.status(400).json({ errors });
                        }
                        
                    }
                })
        } catch (error) {
            console.log("JWT token not valid : " + error);
            res.redirect('/login')
        }
        
    } else {
        res.redirect('/login')
    }
    
}

module.exports.create_offer_get = async (req, res) => {
    try {
        const offers = await Offer.find().populate('user');
        res.render('dashboard', { offers });
    } catch (error) {
        console.error("Error fetching offers:", error);
        res.status(500).send("Error fetching offers");
    }
};


// module.exports.create_offer_get = (req, res) => {
//     res.render('create_offer')}


