import Joi from "joi";

export const sendMessageValidationSchema = Joi.object({
    message: Joi.string()
        .pattern(new RegExp(/^[a-zA-Z\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{1,20}$/))
        .min(2)
        .max(50000)
        .required()
        .messages({
            "string.base": "Message must be a string.",
            "string.empty": "Message cannot be empty.",
            "string.min": "Message must be at least 2 characters long.",
            "string.max": "Message must not exceed 50000 characters.",
            "string.pattern.base": "Message contains invalid characters.",
            "any.required": "Message is required.",
        }),
    recipientId: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            "string.base": "Recipient ID must be a string.",
            "string.hex": "Recipient ID must be a valid hexadecimal string.",
            "string.length": "Recipient ID must be exactly 24 characters long.",
            "any.required": "Recipient ID is required.",
        }),
}).required();

export const deleteMessageValidationSchema = Joi.object({
    messageId: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            "string.base": "Message ID must be a string.",
            "string.hex": "Message ID must be a valid hexadecimal string.",
            "string.length": "Message ID must be exactly 24 characters long.",
            "any.required": "Message ID is required.",
        }),
}).required();
