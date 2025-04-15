const express = require("express");
const router = express.Router({mergeParams:true});
const { listingSchema, reviewSchema } = require("../listingSchema.js");
const Review = require("../Models/Reveiws.js");
const wrapAsync = require("../utilis/wrapAsync.js");
const ExpressError = require("../utilis/ExpressError.js");
const Listing = require("../Models/listingSchema.js");
const {userAuthentication,IsAuthorReviews}  = require("../authmiddleware.js")



const reviewController = require("../Controllers/reviews.js")


function validatereview(req, res, next) {
  let result = reviewSchema.validate(req.body);
  if (result.error) {
    let msg = result.error.details.map((el) => el.message).join(",");

    throw new ExpressError(404, msg);
  } else {
    next();
  }
}
// rewies for post route
router.post(
  "/",
  validatereview,userAuthentication,
  wrapAsync(reviewController.reviewForPost)
);
// delete reveies for the listing
router.delete("/:reviewId",userAuthentication,IsAuthorReviews, wrapAsync( reviewController.destroyRouteForReview));

module.exports = router;
