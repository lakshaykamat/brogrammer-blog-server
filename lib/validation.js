const Joi = require('joi')



const registerValidator = (data) => {
    //Validation Schema for JOI
    const schema = Joi.object({
        name: Joi.string().min(5).max(20).required(),
        email: Joi.string().max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        bio:Joi.string().min(5).max(255).required(),
        designation:Joi.string().min(5).max(255).required(),
        image:Joi.string().min(5).max(255).required(),
    })

    //validating the body
    return schema.validate(data)
}

const loginValidator = (data) => {
    //Validation Schema for JOI
    const schema = Joi.object({
        email: Joi.string().max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })

    //validating the body
    return schema.validate(data)
}
module.exports = {
    registerValidator,
    loginValidator
}