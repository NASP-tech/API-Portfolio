const joi = require('joi')

const Validator = {
    registerValidator: data => {
        const ValidateSchema = joi.object({
            fullname: joi.string()
                .min(7)
                .required(),
            username: joi.string()
                .min(7)
                .required(),
            email: joi.string()
                .min(7)
                .required()
                .email(),
            phone: joi.string()
                .pattern(new RegExp('^[0-9]{8}$')),
            password: joi.string()
                .min(7)
                .required()
        })

        return ValidateSchema.validateAsync(data)
    },

    loginValidator: data => {
        const ValidateSchema = joi.object({
            username: joi.string()
                .min(7),
            email: joi.string()
                .min(7)
                .email(),
            password: joi.string()
                .min(7)
                .required()
        })
        
        return ValidateSchema.validateAsync(data)
    }
}

module.exports = Validator