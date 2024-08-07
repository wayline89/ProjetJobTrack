const { Router } = require("express");

const router = Router(); 
const { requireAuth, checkUser, checkOffers }= require('../middleware/authMiddleware');
const authController = require("../controllers/authControllers");
const offerController = require("../controllers/offerControllers");
const dashboardController = require("../controllers/dashboardController");


router.get('*', checkUser)
router.post('*', checkUser)
router.delete('*', checkUser)
router.put('*', checkUser)
router.put('*', checkUser)
router.get('/profile', checkOffers)


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
router.get('/display_offer', requireAuth, offerController.display_offer_id ); 



router.put('/update_offer/:id', offerController.update_offerput);
router.get('/update_offer/:id', offerController.update_offer);



router.get('/update_profile/',authController.update_profile );
router.put('/update_profile/',authController.update_profileput );
// Dashboard route 

router.get('/dashboard', dashboardController.dashboard_get);
router.delete('/dashboard', dashboardController.delete_offer);

module.exports = router;

