import { connectToDB } from "@/app/lib/dbconnect";
import { Products } from "@/app/lib/Models/productSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();
    const products = await Products.find();
    return NextResponse.json({
      body: products,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: error,
      success: false,
    });
  }
}

export async function POST(req) {
  const data = await req.json();
  // console.log(data);
  try {
    await connectToDB();
    const products = new Products(data);
    await products.save();
    return NextResponse.json({
      message: "Product created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: error,
      success: false,
    });
  }
}
