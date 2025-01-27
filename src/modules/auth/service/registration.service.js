import { User } from "../../../DB/model/User.model.js";
import { emailEvent } from "../../../util/events/confirmEmail.event.js";
import { asyncHandling } from "../../../util/error/error.handling.js";
import { successResponse } from "../../../util/respons/success.respons.js";
import { verifyToken } from "../../../util/token/token.js";
import { generateHash } from "../../../util/hash/hash.js";
import { encrypt } from "../../../util/hash/encrypt.js";
export const signup = asyncHandling(
    async (req, res, next) => {
        const { userName, email, password, confirmPassword, phone } = req.body;

        if (password !== confirmPassword) {
            return next(new Error("Passwords do not match.", { cause: 400 }));
        }

        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return next(new Error("Email already exists.", { cause: 409 }));
        }

        const hashPassword = generateHash({ planText: password , salt: process.env.HASH_SALT});
        const encryptPhone = encrypt({ planText: phone, signature: process.env.ENCRYPTION });

        const { _id } = await User.create({
            userName,
            email,
            password: hashPassword,
            phone: encryptPhone
        });

        emailEvent.emit("sendEmail", { email });

        return successResponse({ res: res, message: "Signup successful. Please check your email to confirm.", data: _id, status: 201 })
    }
);

export const confirmEmail = asyncHandling(
    async (req, res, next) => {
        const { authorization } = req.headers;

        if (!authorization) {
            return next(new Error("Authorization token is required.", { cause: 401 }));
        }

        const decoded = verifyToken({ token: authorization, signature: process.env.EMAIL_SIGN })
        const { email } = decoded;

        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return next(new Error("User not found.", { cause: 404 }));
        }

        if (checkUser.confirmEmail) {
            return next(new Error("Email already confirmed.", { cause: 409 }));
        }

        checkUser.confirmEmail = true;
        await checkUser.save();

        return successResponse({ res: res, message: "Email confirmed successfully.", status: 200 })

    }
);

