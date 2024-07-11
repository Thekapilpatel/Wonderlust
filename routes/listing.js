const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const multer = require('multer');
const{storage}=require("../cloudConfig.js");
const upload = multer({storage});

const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listing.js");

router.route("/")
.get(wrapAsync(listingController.index)) //index route

.post( isLoggedIn, validateListing,(upload.single('listing[image]') ,
  wrapAsync(listingController.createListing)));// Create Route


//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.route("/:id")
.get( wrapAsync(listingController.showListing))//show route
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))//delete route
.put(isLoggedIn,validateListing,(upload.single('listing[image]') 
,isOwner,wrapAsync(listingController.updateListing)));//update route


//Edit route
router.get(
  "/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports = router;
