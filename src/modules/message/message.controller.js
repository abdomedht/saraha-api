import { Router } from "express";
import { validation } from "../../middleware/validation.middleware.js";
import { deleteMessageValidationSchema, sendMessageValidationSchema } from "./message.validtion.js";
import { sendMessage } from "./services/sendMessage.service.js";
import { deleteMessage } from "./services/deleteMessage.service.js";
import { authentication, authorization } from '../../middleware/auth.middleware.js'
import { roles } from "../user/user.controller.js";
const messageRouter = Router()
messageRouter.post('/message', validation(sendMessageValidationSchema), sendMessage)
messageRouter.delete('/message', validation(deleteMessageValidationSchema), authentication(), authorization(roles), deleteMessage)

export default messageRouter;
