const Joi = require('joi');


module.exports.listingSchema = Joi.object({
    listings:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.string().min(0).required(),
        image:Joi.string().allow("",null),
        location:Joi.string().required(),
        country:Joi.string().required(),
    }).required()
})

module.exports.reviewSchema = Joi.object({
    reviews:Joi.object({
        rating:Joi.number().min(1).max(5).required(),
        Comment:Joi.string().required()
    }).required()
})