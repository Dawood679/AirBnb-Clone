const express = require("express");
const multer  = require('multer')
const router = express.Router();
const wrapAsync = require("../utilis/wrapAsync.js");
const ExpressError = require("../utilis/ExpressError.js");
const { listingSchema, reviewSchema } = require("../listingSchema.js");
const Review = require("../Models/Reveiws.js");
const { userAuthentication, Isowner } = require("../authmiddleware.js");
const listingControllers = require("../Controllers/listings");
const {storage} = require("../cloudinary.js")

const upload = multer({ storage })

function validatelisting(req, res, next) {
  let result = listingSchema.validate(req.body);

  if (result.error) {
    let msg = result.error.details.map((el) => el.message).join(",");

    throw new ExpressError(404, msg);
  } else {
    next();
  }
}

router
  .route("/")
  .get(wrapAsync(listingControllers.index))
  .post(
    validatelisting,
    userAuthentication,upload.single("listings[image]"),
    wrapAsync(listingControllers.createNewRoute)
  );
  

// all the listing are here
// router.get(
//   "/",
//   wrapAsync(listingControllers.index)
// );

// to create new listing get route
router.get(
  "/new",
  userAuthentication,
  listingControllers.getRouteForCreateFrom
);
// post to create new listings
// router.post(
//   "/",
//   validatelisting,userAuthentication,
//   wrapAsync(listingControllers.createNewRoute)
// );

//edit path get request
router.get(
  "/:id/edit",
  userAuthentication,
  Isowner,
  wrapAsync(listingControllers.editPathTgetRequest)
);

router
  .route("/:id")
  .patch(
    userAuthentication,
    Isowner,
    validatelisting,upload.single("listings[image]"),
    wrapAsync(listingControllers.editpathForPostRequest)
  )
  .delete(
    userAuthentication,
    Isowner,
    wrapAsync(listingControllers.destroyRoute)
  )
  .get(wrapAsync(listingControllers.showRoute));

// patch req for edit this staf
// router.patch(
//   "/:id",userAuthentication,Isowner,
//   validatelisting,
//   wrapAsync(listingControllers.editpathForPostRequest)
// );

// to delte route
// router.delete(
//   "/:id",userAuthentication,Isowner,
//   wrapAsync(listingControllers.destroyRoute)
// );

//to show to all the listing to view
// router.get(
//   "/:id",
//   wrapAsync(listingControllers.showRoute)
// );


module.exports = router;
