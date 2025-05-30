const Joi = require('joi');

module.exports.listSchema = Joi.object({
    List : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("",null),
    }).required(),
});

module.exports.reviewSchema = Joi.object({
    Review: Joi.object({
        rating:Joi.number().min(1).max(5),
        comment:Joi.string().required(),
    }).required(),
});