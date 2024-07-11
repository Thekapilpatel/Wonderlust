const review = require("../models/review.js");
const Listing = require("../models/listing.js");
const user = require("../models/user.js");


module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
    };

module.exports.signup=async(req,res)=>{
    try{
      let {username, Email,password} = req.body;
      const newUser = new User({Email,username});
      const registeredUser = await User.register(newUser , password);
      console.log(registeredUser);
  
      req.login(registeredUser, (err)=>{
        if(err){
          return next();
        }
        req.flash("success", "Welcome to Wonderlust !");
        res.redirect("/listings");
      });
  }catch(e){
      req.flash("error", e.message);
      res.redirect("/signup");
    }
      };

      module.exports.renderLoginForm=(req,res)=>{
        res.render("users/login.ejs");
      };

module.exports.login = async(req,res)=>{
    req.flash(  "success", "welcome to Wanderlust! you are logged in !");
    let redirectUrl = res.locals.redirect || "/listings"; 
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out !");
        res.redirect("/listings");

    })
 }