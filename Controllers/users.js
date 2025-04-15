const User = require("../Models/user.js");





// signup render from get request
module.exports.SingupGet = (req, res) => {
    res.render("users/signup.ejs");
  }

  // signup post request to add the user in the listing
  module.exports.Singuppost = async (req, res) => {
    let { email, username, password } = req.body;
    let user1 = new User({
      email: email,
      username: username,
    });
    let result = await User.register(user1, password);
  req.login(user1,(err)=>{
    if(err){
      return next(err)
    }else{
      req.flash("success", "Welcome to WanderLust");
      res.redirect("/listings");
    }
  })
    
  }

  // get route of the login form
  module.exports.loginget = (req, res) => {
    res.render("users/login.ejs");
  }
  // post route of the login form
  module.exports.logingPost = (req, res) => {
    req.flash("success", "Welcome you are login in the wonderlust");
   
    res.redirect(res.locals.newUrl || "/listings");
  }

  //get request for logoute
  module.exports.logoutGet = (req,res,next)=>{
    req.logout((err)=>{
      if(err){
        return next(err)
      }else{
        req.flash("success","You are logged out")
        res.redirect("/listings")
      }
    })
  }