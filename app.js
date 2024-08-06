const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const {requireAuth, checkUser, checkOffers} = require('./middleware/authMiddleware')
const bodyParser = require('body-parser');
const { dashboard_get } = require("./controllers/dashboardController");
const { display_offer, display_offer_id, update_offer, update_offerput } = require("./controllers/offerControllers");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://wayline:test123@jwtninja.66w0ue0.mongodb.net/node-auth?retryWrites=true&w=majority&appName=JWTNinja";

mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(3000);
    console.log(`Connected to MongoDB - Connection string :  ${dbURI}`);
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// routes
app.get('*', checkUser);
app.get('*', checkOffers);



app.get("/", (req, res) => res.render("login"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.get("/home", requireAuth,  dashboard_get ); 

app.get('/create_offer', requireAuth, (req, res) => res.render('create_offer'));

app.get('/job', requireAuth, (req, res) => res.render('job'));
app.get('/profile', requireAuth, (req, res) => res.render('profile'));



app.get('/dashboard', requireAuth, dashboard_get ); 
app.get('/signup',  (req, res) => res.render('signup'));


app.get('/display_offer', requireAuth, display_offer_id ); 

app.get('/update_offer', update_offer);
app.put('/update_offer/:id', update_offerput);

app.use(authRoutes);