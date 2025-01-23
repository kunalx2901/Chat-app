import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLen:6
    },
    profileImage:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },   
},{timestamps:true},); 

const User = mongoose.model("User" , userSchema);

export default User;