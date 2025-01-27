import { asyncHandling } from "../../../util/error/error.handling.js";
import { successResponse } from "../../../util/respons/success.respons.js";
import { decrypt } from "../../../util/hash/encrypt.js";
import { User } from "../../../DB/model/User.model.js";
import { messageModel } from "../../../DB/model/message.model.js";
export const getProfile = asyncHandling(async (req, res) => {
    const decryptedPhone = decrypt({ 
        cipherText: req.user.phone, 
        signature: process.env.ENCRYPTION 
    });
    const userProfile = {
        userName: req.user.userName,
        gender: req.user.gender,
        DOB: req.user.DOB,
        image: req.user.image,
        phone: decryptedPhone,
    };

    const messages = await messageModel.find({ recipientId: req.user._id }).select("message createdAt -_id");
    return successResponse({
        res,
        message: "Profile retrieved successfully.",
        data: { user: userProfile, messages },
        status: 200,
    });
});
export const shareProfile = asyncHandling(
    async (req, res) => {
        const user = await User.findById(req.params.userId).select('image userName gender DOB -_id')
        return successResponse({ res: res, message: "success", data: user, status: 200 })
    }
);
