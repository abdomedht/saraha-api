import Joi from "joi";
export const updateProfileValidationSchema = Joi.object().keys({
    userName: Joi.string()
        .min(2)
        .max(30)
        .messages({
            'string.base': 'Username must be a string.',
            'string.empty': 'Username cannot be empty.',
            'string.min': 'Username must be at least 2 characters long.',
            'string.max': 'Username must be at most 30 characters long.',
            'any.required': 'Username is required.'
        }),
    phone: Joi.string()
        .pattern(/^(002|\+2)?01[0125][0-9]{8}$/)
        .messages({
            'string.pattern.base': 'Phone number must be a valid Egyptian phone number.',
            'string.empty': 'Phone number cannot be empty.',
            'any.required': 'Phone number is required.'
        }),
    gender: Joi.string().valid("male", "female"),
    DOB: Joi.date().less("now"),
    address: Joi.string()



}).required()
export const updatePasswordValidationSchema = Joi.object().keys({
    oldPassword: Joi.string().required(),
    password: Joi.string()
        .not(Joi.ref('oldPassword'))
        .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
        .required()
        .messages({
            'string.pattern.base': 'Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, and one number.',
            'string.empty': 'Password cannot be empty.',
            'any.required': 'Password is required.'
        }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Passwords do not match.',
            'string.empty': 'Confirm Password cannot be empty.',
            'any.required': 'Confirm Password is required.'
        }),



}).required()
export const shareProfileValidationSchema = Joi.object().keys({
    
    userId: Joi.string().hex().length(24).required(),
  



}).required()
