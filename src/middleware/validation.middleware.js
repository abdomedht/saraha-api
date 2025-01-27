import { asyncHandling } from "../util/error/error.handling.js";
export const validation = (schema) => {
    return asyncHandling(async (req, res, next) => {
        const inputData = { ...req.params, ...req.query, ...req.body };
        await schema.validateAsync(inputData, { abortEarly: false });
        return next();
    });
}