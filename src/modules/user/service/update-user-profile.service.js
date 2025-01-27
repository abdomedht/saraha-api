import { asyncHandling } from "../../../util/error/error.handling.js";
import { successResponse } from "../../../util/respons/success.respons.js";
import { encrypt } from "../../../util/hash/encrypt.js";
import { User } from "../../../DB/model/User.model.js";
import { generateHash } from "../../../util/hash/hash.js";
export const updateProfile = asyncHandling(
    async (req, res, next) => {

        if (req.body.phone) {
            req.body.phone = encrypt({ plainText: req.body.phone, signature: process.env.ENCRYPTION });
        }


        const updatedProfile = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });


        return successResponse({ res, message: "Profile updated successfully.", status: 200, data: updatedProfile });
    }
);
export const updatePassword = asyncHandling(
    async(req,res,next)=>{
        const {password} = req.body
        const hashedPassword = generateHash({planText:password,salt:process.env.HASH_SALT})
        const updatedPassword= await User.findByIdAndUpdate(req.user._id,{password:hashedPassword,passwordChangeDate:Date.now()},{ new: true });
        return successResponse({ res, message: "Profile updated successfully.", status: 200, data: req.user });
    }
)
