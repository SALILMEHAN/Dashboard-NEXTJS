import { connectToDB } from "@/app/lib/dbconnect";
import { Users } from "@/app/lib/Models/userSchema";
import { NextResponse } from "next/server";
import bcryptjs from "bcrypt";

export async function GET(req) {
    try {
        await connectToDB();
        const users=await Users.find();
        return NextResponse.json({
            body:users,
            success:true
        });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:error,
            success:false
        })
    }
}

export async function POST(req) {
    const data=await req.json();
    const hashedPassword=await bcryptjs.hash(data.password,16);
    data.password=hashedPassword;
    // console.log(data);
    try {
        await connectToDB();
        const user = new Users(data);
        await user.save();
        return NextResponse.json({
            message: "User created successfully",
            success: true
        });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:error,
            success:false
        })
    }
}