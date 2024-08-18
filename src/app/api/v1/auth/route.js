import { Users } from "@/app/lib/Models/userSchema";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { connectToDB } from "@/app/lib/dbconnect";

export async function POST(req) {
    const data = await req.json();
    
    try {
        await connectToDB();
        const { email, password } = data;
        const user = await Users.findOne({ email:email });

        if (!user) {
            return NextResponse.json({
                message: "User not found",
                success: false
            }, { status: 404 });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return NextResponse.json({
                message: "Invalid password",
                success: false
            }, { status: 401 });
        }

        const tokenData = {
            userId: user._id
        };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' });

        const response = NextResponse.json({
            message: "Login successful",
            user,
            success: true,
        }, { status: 200 });

        response.headers.append('Set-Cookie', `token=${token}; Max-Age=86400; HttpOnly; Path=/; ${process.env.NODE_ENV === 'production' ? 'Secure; SameSite=Strict' : ''}`);

        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: error.message,
            success: false
        }, { status: 500 });
    }
}

export async function GET(req){
    await connectToDB();
    const response = NextResponse.json({
        message: "Logout successful",
        success: true,
    }, { status: 200 });
    response.headers.append('Set-Cookie', `token=${null}; Max-Age=0;` );
    return response;
}