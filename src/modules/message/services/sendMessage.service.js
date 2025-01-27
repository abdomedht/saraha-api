import { messageModel } from "../../../DB/model/message.model.js";
import { User } from "../../../DB/model/User.model.js";
import { asyncHandling } from "../../../util/error/error.handling.js";
import { successResponse } from "../../../util/respons/success.respons.js";

export const sendMessage = asyncHandling(
    async (req, res, next) => {
        const { recipientId, message } = req.body
        const user = await User.findOne({ _id: recipientId, deleted: false })
        if (!user) {
            return next(new Error("user not found", { cause: 404 }))
        }
        await messageModel.create({ message, recipientId })
        return successResponse({ res: res, message: " successful.", data: { recipientId, message }, status: 200 })

    }
)