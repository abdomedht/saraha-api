import mongoose, { Schema, Types, model } from "mongoose";
const messageSchema = new Schema({
    message:{
        type: String,
        minlength: 2,
        maxlength: 50000,
        required: true
    },
    recipientId:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})
export const messageModel=mongoose.model.messageModel||model('Message',messageSchema)