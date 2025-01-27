import { messageModel } from "../../../DB/model/message.model.js";
import { asyncHandling } from "../../../util/error/error.handling.js";
import { successResponse } from "../../../util/respons/success.respons.js";

export const deleteMessage = asyncHandling(
    async (req, res, next) => {
        const { messageId } = req.body
        const deletedMessage = await messageModel.findOneAndDelete({
            recipientId: req.user._id,
            _id: messageId,
        });

        if (!deletedMessage) {
            return next(new Error("Message not found or user not authorized", { cause: 404 }));
        }

        return successResponse({
            res,
            message: "Message deleted successfully.",
            data: deletedMessage,
            status: 200,
        });

    }
)