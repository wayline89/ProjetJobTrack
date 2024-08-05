const { Router } = require("express");
const authController = require("../controllers/authControllers");
const offerController = require("../controllers/offerControllers");
const dashboardController = require("../controllers/dashboardController");
const { requireAuth, checkUser, checkOffers }= require('../middleware/authMiddleware');


const router = Router(); 


router.get('*', checkUser)
router.post('*', checkUser)
router.delete('*', checkUser)
router.put('*', checkUser)


// Register routes

router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);

// Login routes

router.get("/login", authController.login_get);
router.post("/login", authController.login_post);

// Logout route

router.get("/logout", authController.logout_get);

// make new offer 

router.get("/create_offer", offerController.create_offer_get);
router.post("/create_offer", offerController.create_offer_post);

// Dashboard route 

router.get('/dashboard', dashboardController.dashboard_get);



module.exports = router;

