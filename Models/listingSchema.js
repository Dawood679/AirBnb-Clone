const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Reveiw  = require("./Reveiws")
const Review = require("./Reveiws")


const listingSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,

    },
    image:{
        url:String,
        filename:String
    },
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true

    },reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }],owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

listingSchema.post("findOneAndDelete",async (listing)=>{
    if(listing){

        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
})



const Listing = mongoose.model("Listing",listingSchema)






module.exports = Listing