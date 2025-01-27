import mongoose from "mongoose";
import { User } from "./model/User.model.js";
export const connectionDB =async()=>{
    await mongoose.connect(process.env.DB_URI)
    .then(result=>console.log(`data base connected`))
    .catch(err=>console.log(err));
}