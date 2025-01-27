import { asyncHandling } from "../../../util/error/error.handling.js";
import { User } from "../../../DB/model/User.model.js";
import { successResponse } from "../../../util/respons/success.respons.js";
export const freezeUser= asyncHandling(
     async(req,res,next)=>{
               
                const user= await User.findByIdAndUpdate(req.user._id,{ deleted : true , passwordChangeDate:Date.now() },{ new: true });
                return successResponse({ res, message: "Profile updated successfully.", status: 200, data: user });
    }
)