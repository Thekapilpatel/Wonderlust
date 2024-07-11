if(process.env.NODE_ENV !="production"){
  require("dotenv").config();
}

console.log(process.env.SECRET);

const express = require("express");
const ejsmate = require("ejs-mate");
const app = express(); //Require
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");


const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const methodOverride = require("method-override");
app.use(express.urlencoded({ extended: true }));
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const passport = require("passport");
const localStratigy = require("passport-local");
const user = require("./models/user.js");


app.set("view engine", "ejs");
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

app.get("/", (req, res) => {
  // home root
  res.send("Hi, There iam  Root. ");
});

app.use(session(sessionOptions));//creating session in express
app.use(flash());

app.use(passport.initialize());  // initilize for use
app.use(passport.session());  // integrating Passport.js with session management in Express applications.
passport.use(new localStratigy(user.authenticate())); // we are forcing to  use user.authenticate 

passport.serializeUser(user.serializeUser());  // used to store user data 
passport.deserializeUser(user.deserializeUser()); // used to remove user data 

app.use((req, res, next) => { // Added parentheses around parameters
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/",userRouter);

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust"; //Monogo DB connection
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(`error-${err}`);
  });
async function main() {
  await mongoose.connect(mongo_url);
}

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
}); // when any  other route not maches request this will work

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Somethingwent worng!" } = err;
  res.render("./listings/Error.ejs", { message }); // this is middle ware  this helps that server  will not stop stop during error occuring
});

app.listen(8080, () => {
  console.log("Server is listening to port 8080"); //app is listening
});
