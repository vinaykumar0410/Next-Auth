
import mongoose from "mongoose";

const userScehma = new mongoose.Schema({
    username : {
        type : 'String',
        required : [true, 'Please Provide a username'],
        unique : true
    },
    email : {
        type : 'String',
        required : [true, 'Please Provide a email'],
        unique : true
    },
    password : {
        type : 'String',
        required : [true, 'Please Provide a password'],
    },
    isVerified : {
        type : Boolean, 
        default : false
    },
    isAdmin : {
        type : Boolean, 
        default : false
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken : String,
    verifyTokenExpiry : Date
})

const User = mongoose.models.User || mongoose.model("User", userScehma);

export default User