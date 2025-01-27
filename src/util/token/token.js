
import jwt from 'jsonwebtoken';
export const generateToken = ({ payload = {}, signature = process.env.BEARER_TOKEN_SIGN, options = {} } = {}) => {

    return jwt.sign(payload, signature, options);
}
export const verifyToken = ({ token = "", signature = process.env.BEARER_TOKEN_SIGN } = {}) => {
    return jwt.verify(token, signature);
}