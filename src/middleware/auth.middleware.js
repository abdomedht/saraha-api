import { User } from "../DB/model/User.model.js";
import { asyncHandling } from "../util/error/error.handling.js";
import { verifyToken } from "../util/token/token.js";

export const authentication = () => {
    return asyncHandling(
        async (req, res, next) => {
            const { authorization } = req.headers;
            if (!authorization) {
                return next(new Error("Authorization token is required.", { cause: 401 }));
            }
            let [Bearer, token] = authorization.split(" ");
            if (Bearer !== "Bearer" || !token) {
                return next(new Error("Invalid authorization format.", { cause: 400 }));
            }
            token = verifyToken({ token: token, signature: process.env.BEARER_TOKEN_SIGN })
            if (!token.id) {
                return next(new Error("Invalid token payload.", { cause: 400 }));
            }
            const checkUser = await User.findById(token.id);
            if (!checkUser) {
                return next(new Error("User not found.", { cause: 404 }));
            }
            if(checkUser.passwordChangeDate && parseInt(checkUser.passwordChangeDate.getTime()/1000)>=token.iat)
            {
                return next(new Error("invalid -cerdantial", { cause: 400 }));
            }
            req.user = checkUser;
            next();
        }
    );
}

export const authorization = (roles = []) => {
    return asyncHandling(
        (req, res, next) => {
            const user = req.user;
            if (!user || !roles.includes(user.role)) {
                return next(new Error("Access denied.", { cause: 403 }));
            }
            next();
        }
    );
};