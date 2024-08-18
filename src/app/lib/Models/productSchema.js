import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    stock:{
        type:Number,
        required:true,
        min:0,
    },
    img:{
        type:String,
        default:'https://i.sstatic.net/WCJqe.jpg'
    },
    color:{
        type:String,
        default:'White'
    },
    size:{
        type:String,
        default:'M'
    },
},{timestamps:true});

export const Products = mongoose.models.Products || mongoose.model("Products",productSchema);