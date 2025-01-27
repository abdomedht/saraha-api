
import { Router } from 'express'
import { getProfile, shareProfile } from './service/user-profile.service.js'
import { authentication, authorization } from '../../middleware/auth.middleware.js';
import { updatePassword, updateProfile } from './service/update-user-profile.service.js';
import { validation } from '../../middleware/validation.middleware.js';
import { shareProfileValidationSchema, updatePasswordValidationSchema, updateProfileValidationSchema } from './validation.js';
import { freezeUser } from './service/freeze-profile.service.js';
const userRouter = Router();
export const roles = ["Admin", "User"]

userRouter.get("/profile", authentication(), authorization(roles), getProfile)
userRouter.patch("/profile", validation(updateProfileValidationSchema), authentication(), authorization(roles), updateProfile)
userRouter.patch("/profile/password", validation(updatePasswordValidationSchema), authentication(), authorization(roles), updatePassword)
userRouter.delete("/profile", authentication(), authorization(roles), freezeUser)
userRouter.get("/profile/:userId", validation(shareProfileValidationSchema), authentication(), authorization(roles), shareProfile)

export default userRouter