const Joi = require('joi');

const giftSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().optional(),
    price: Joi.number().greater(0).required(),
    reserved: Joi.boolean().optional()
});

module.exports = giftSchema;
