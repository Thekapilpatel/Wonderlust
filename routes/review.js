const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {  validateReview, isLoggedIn, isAuthor } = require("../middleware.js");
const review = require("../models/review.js");
const Listing = require("../models/listing.js");

const reviewController = require("../controllers/review.js");

  

 //Review route
 router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.reviewRoute));
  
  // delete raview
  router.delete( "/:reviewId",  isLoggedIn,   isAuthor,wrapAsync(reviewController.destroyRoute));

  module.exports = router;