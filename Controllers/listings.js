const Listing = require("../Models/listingSchema.js");




// to show all the liting are here and index route
module.exports.index = async (req, res) => {
    let listings = await Listing.find();
    
    res.render("listing/index.ejs", { listings });
  }

// new listing get request
module.exports.getRouteForCreateFrom = (req, res) => {
 

    res.render("listing/newListing.ejs");
  
}
//post route to create new listings
module.exports.createNewRoute = async (req, res) => {
  let {path,filename} = req.file
  let url = path
  
    let listing = await Listing.insertOne(req.body.listings);
    listing.owner = req.user._id;
    listing.image = {url,filename}
    await listing.save();
    
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
  }
// edit path to get request

module.exports.editPathTgetRequest = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(`${id}`);
    let originalimg = listing.image.url
    originalimg =  originalimg.replace("/upload","/upload/h_250,w_200")
    if (!listing) {
      req.flash("error", "Listing are not found");
      res.redirect("/listings");
    } else {
      
      res.render("listing/edit.ejs", { listing,originalimg });
    }
  }

// edit path to psot request
module.exports.editpathForPostRequest = async (req, res) => {
    let { id } = req.params;
    
      let formData = req.body.listings;
      let listing = await Listing.findByIdAndUpdate(`${id}`, formData, {
        runValidators: true,
      });
      
      
      if(typeof req.file !== "undefined"){
        let {path,filename} = req.file
        let url = path
        listing.image = {url,filename}
        await listing.save()
      }
      req.flash("success", "Listing are Update");
      res.redirect(`/listings/${id}`);
    
    
  }

// destroy route
module.exports.destroyRoute = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(`${id}`);
    req.flash("success", "Listing Delete");
    res.redirect("/listings");
  }

// show route
module.exports.showRoute = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(`${id}`).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    
    
    if (!listing) {
      req.flash("error", "Listing are not found");
      res.redirect("/listings");
    } else {
      res.render("listing/show.ejs", { listing });
    }
  }
