

if(process.env.NODE_ENV != "production"){
  require('dotenv').config()
}
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const listings = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash")
const passport = require("passport")
const localStrategy = require("passport-local")
const User = require("./Models/user.js")
const userRouter = require("./routes/users.js")


let Db = process.env.DB_URL





app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

const store = MongoStore.create({
  mongoUrl:Db,
  crypto:{
    secret:process.env.SECRET,
    
  },touchAfter:26*3600
})


store.on("error",()=>{
  console.log("error in mongo session store",err)
})

app.use(
  session({ store,secret: process.env.SECRET, resave: false, saveUninitialized: true,cookie:{
    expires:Date.now() + 7 * 24*60*60*1000,
    maxAge:7 * 24*60*60*1000,
    httpOnly:true
  } })
);
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


main()
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(Db);
}







app.get("/", (req, res) => {
  res.send("this is working");
});


app.use((req,res,next)=>{
  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  res.locals.userData = req.user
  next()
})


// app.get("/demouser",async (req,res)=>{
//    let fakeuser = new User({
//     email:"Dawood Alam",
//     username:"Dawoodalam"
//    })

//    let result =  await User.register(fakeuser,"12345")
//    res.send(result)
// })


app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", userRouter);

app.use((err, req, res, next) => {
  let { status = 500, message = "Internal Server Error" } = err;
  res.status(status).render("listing/error.ejs", { message });
});

app.listen(3000, () => {
  console.log("App is listning");
});
