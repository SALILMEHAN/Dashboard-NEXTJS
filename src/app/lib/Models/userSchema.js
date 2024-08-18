import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        maxlength: 20,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        default:'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png'
    },
    isAdmin:{
        type:Boolean,
        default:false
        },
    isActive:{
        type:Boolean,
        default:true
        },
    phone:{
        type:String,
    },
    address:{
        type:String,
        default:''
    },
    premium:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

export const Users = mongoose.models.Users || mongoose.model("Users",userSchema);