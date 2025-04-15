
const Listing = require("../Models/listingSchema.js");
const Review = require("../Models/Reveiws.js");
const { listingSchema, reviewSchema } = require("../listingSchema.js");
// rewies for post route

module.exports.reviewForPost = async (req, res) => {
    
    let { id } = req.params;
    let listing = await Listing.findById(`${id}`);
    let review = new Review(req.body.reviews);
    review.author = req.user._id
    listing.reviews.push(review);
    
    await review.save();
    await listing.save();
    req.flash("success","New Review Created")
    res.redirect(`/listings/${id}`);
  }

  // review destroy route

  module.exports.destroyRouteForReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    req.flash("success","Review Delete")
    res.redirect(`/listings/${id}`);
  }