const Listing = require("./Models/listingSchema");
const Review = require("./Models/Reveiws");






module.exports.userAuthentication = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to create listing");
    return res.redirect("/login");
  }
  next();
};
module.exports.redirectUrlfunc = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.newUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.Isowner = async (req, res, next) => {
  let { id } = req.params;
  let newvar = await Listing.findById(id);
  if (!newvar.owner._id.equals(res.locals.userData._id)) {
    req.flash("error", "You are not the owner of this listings");
    return res.redirect(`/listings/${id}`);
  }
  next();
};


module.exports.IsAuthorReviews = async (req, res, next) => {
  let { id,reviewId } = req.params;
  let newvar = await Review.findById(reviewId);
  if (!newvar.author._id.equals(res.locals.userData._id)) {
    req.flash("error", "You are not the owner of this Review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};