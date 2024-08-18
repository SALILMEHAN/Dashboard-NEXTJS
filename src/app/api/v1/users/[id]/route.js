import { connectToDB } from "@/app/lib/dbconnect";
import { Users } from "@/app/lib/Models/userSchema";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
    // console.log(params.id);
    const username = params.id;
    try {
        await connectToDB();
        const user = await Users.findOne({username:username});
        return NextResponse.json({ 
            body: user,
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
    const username = params.id;
    const d= await req.json();
    // console.log(d);
    
    try {
        await connectToDB();
        const user = await Users.findOneAndUpdate({username:username},d);
        return NextResponse.json({ 
            message:'User Details Updated',
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
        await Users.findByIdAndDelete(id);
        return NextResponse.json({ 
            message: "User deleted successfully",
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