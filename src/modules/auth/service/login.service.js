
import { asyncHandling } from "../../../util/error/error.handling.js";
import { successResponse } from "../../../util/respons/success.respons.js";
import { User } from "../../../DB/model/User.model.js";
import { generateToken } from "../../../util/token/token.js";
import { compareHash } from "../../../util/hash/hash.js";
export const login = asyncHandling(
    async (req, res, next) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new Error("Email and password are required.", { cause: 400 }));
        }

        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return next(new Error("User not found.", { cause: 404 }));
        }
        const match = compareHash({ planText: password, hashValue: checkUser.password });
        if (!match) {
            return next(new Error("Invalid password.", { cause: 401 }));
        }

        if (!checkUser.confirmEmail) {
            return next(new Error("Please confirm your email before logging in.", { cause: 400 }));
        }

        //const token = jwt.sign({ id: checkUser._id }, process.env.BEARER_TOKEN_SIGN, { expiresIn: '1h' });
        const token = generateToken({ payload: { id: checkUser._id }, signature: process.env.BEARER_TOKEN_SIGN, options: { expiresIn: '1h' } })
        return successResponse({ res: res, message: "Login successful.", data: token, status: 200 })

    }
);
