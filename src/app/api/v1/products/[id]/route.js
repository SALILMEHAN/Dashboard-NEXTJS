import { connectToDB } from "@/app/lib/dbconnect";
import { Products } from "@/app/lib/Models/productSchema";
import { NextResponse } from "next/server";


export async function GET(req,{params}) {
    // console.log(params.id);
    const title = params.id;
    try {
        await connectToDB();
        const product = await Products.findOne({title:title});
        return NextResponse.json({ 
            body: product,
            success:true
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:error,
            success:false
        })
    }  
};

export async function PATCH(req,{params}) {
    // console.log(params.id);
    const title = params.id;
    const d= await req.json();
    // console.log(d);
    
    try {
        await connectToDB();
        await Products.findOneAndUpdate({title:title},d);
        return NextResponse.json({ 
            message:'Product Details Updated',
            success:true
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:error,
            success:false
        })
    }  
};

export async function DELETE(req,{params}) {
    // console.log(params.id);
    const id = params.id;
    try {
        await connectToDB();
        await Products.findByIdAndDelete(id);
        return NextResponse.json({ 
            message: "Product deleted successfully",
            success:true
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:error,
            success:false
        })
    }  
};