import mongoose, { Schema, model } from "mongoose";
const usserSchema = new Schema({
    userName: {
        type: String,
        minlength: 2,
        maxlength: 30,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        default: 'male'
    },
    DOB: Date,
    address: String,
    phone: String,
    image: String,
    confirmEmail: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: 'User'
    },
    passwordChangeDate:Date,
    deleted:{
        type:Boolean,
        default: false
    }
}, {
    timestamps: true
})
export const User = mongoose.model.User||new model('User', usserSchema);
