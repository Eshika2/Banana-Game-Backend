import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    otp : {
        type : String,
        required : true
    },
    is_active : {
        type : Number,
        default : 1
    },
}, {
    timestamps : {
        createdAt : "created_at",
        updatedAt : "updated_at"
    }
})

const EmailConfirmation = mongoose.model("email_confirmations", otpSchema);

export default EmailConfirmation;