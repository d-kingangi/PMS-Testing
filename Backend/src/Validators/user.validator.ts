import joi from 'joi';

export const registerUserSchema = joi.object({
    firstname: joi.string().min(3).required(),
    lastname: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().required()
})