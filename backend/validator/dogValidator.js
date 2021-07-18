const Joi = require('joi');

function validateDog(dog) {
    // validate the owner object
    const ownerSchema = Joi.object().keys({
        name: Joi.string().min(2).max(50).required(),
        address: Joi.string().min(20).max(80).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } } ).required(),
        phone: Joi.string().min(10).max(20).required()
    })

    // validate dog object
    const schema = Joi.object({
        image: Joi.string(),
        name: Joi.string().min(2).max(50).required(),
        breed: Joi.string().min(3).max(25).required(),
        gender: Joi.string().required(),
        age: Joi.number().integer().min(1).max(80).required(),
        owner: ownerSchema
    });
    return Joi.validate(dog, schema);

}


module.exports = {validateDog}