const Joi = require('joi')

const movieValidation = (data) => {
    const schema = Joi.object({
        title:Joi.string().trim().required().messages({
          'string.empty': `The input data can't be null!`
        }),
        image:Joi.string().trim().required().messages({
          'string.empty': `Add a image!`
        }),
    })

    return schema.validate(data)
} 

module.exports = movieValidation