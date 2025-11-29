import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user_name : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    level : {
        type : Number,
        default : 1
    },
    rank : {
        type : Number,
        default : 0
    },
    score : {
        type : Number,
        default : 0
    },
    heighest_score : {
        type : Number,
        default : 0
    },
    total_match_count : {
        type : Number,
        default : 0
    },
    total_correct_answer_count : {
        type : Number,
        default : 0
    },
    total_wrong_answer_count : {
        type : Number,
        default : 0
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

const User = mongoose.model("users", userSchema);

export default User