const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../Models/listingSchema.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main(){
  await mongoose.connect(MONGO_URL)
}

  const initDB = async () => {
    await Listing.deleteMany({});
    let result = initData.data.map((obj)=>({...obj,owner:'67fce159ce50c5fe39a3d261'}))
    await Listing.insertMany(result);
    console.log("data was initialized");
  };
  
  initDB();

