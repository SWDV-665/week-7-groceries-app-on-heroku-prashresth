const Joi = require('joi');

module.exports = {
    validateGroceryItem(item) {
        const schema = Joi.object().keys({
            name: Joi.string().min(2).max(20).required(),
            quantity: Joi.number().min(1).required(),
            price: Joi.number().greater(0).required()
        })
        return Joi.validate(item, schema);
    }
}