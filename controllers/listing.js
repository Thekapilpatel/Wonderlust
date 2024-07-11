const Listing = require("../models/listing.js");
const listing = require("../routes/listing.js")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');



module.exports.index =   async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  };

  module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
    res.redirect("/listings");
  };

  module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");
    if (!listing) {
      req.flash("error", "The listing you are looking for does not exist!");
      res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
  };

  module.exports.createListing = async (req, res) => { //create listing
    let response = await geocodingClint.forwordGeocode({
      query: req.body.listing.location,
      limit: 1,
    }).send();
  
    let url = req.file.path;
    let filename = req.file.filename;
  
    const newlisting = new listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image = { url, filename };
    
    // Define `listing` object and assign `geometry` property
    let listing = {};
    listing.geometry = response.body.features[0].geometry;
    
    newlisting.geometry = listing.geometry;
  
    let savedlisting = await newlisting.save();
    console.log(saved);
  
    await newlisting.save();
    req.flash("success", "New listing created !");
    res.redirect("/listings");
  };
  


  //edit route
  module.exports.renderEditForm= async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    req.flash("success", "Listing Edited !");
    if (!listing) {
      req.flash("error", "The listing you are looking for does not exist!");
      res.redirect("/listings");
    }

    let orignalImageUrl = listing.image.url;
     orignalImageUrl.replace("/upload","/upload/,w_250");
    res.render("listings/edit.ejs", { listing,orignalImageUrl });
  };


//update route
  module.exports.updateListing = async (req, res) => {
     let listing= await Listing.findByIdAndUpdate(id, { ...req.body.listing });

if(typeof req.file !=="undefined"){
     let url = req.file.path;
    let filename = req.file.filename;
    listing.image ={url,filename};
    await listing.save();
  }  

    req.flash("success", "Listing Updated !");
    res.redirect(`/listings/${id}`);
  };

  module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletelisting = await Listing.findByIdAndDelete(id);
    console.log(deletelisting);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  };