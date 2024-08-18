import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import { Users } from "@/app/lib/Models/userSchema";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
    } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    // console.log("id==", body);

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET) // Corrected the key name here
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // console.log("paymentverify-> route userid", userId);

      await Users.findByIdAndUpdate(userId, { premium: true });
      return NextResponse.json(
        {
          message: "success",
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "fail",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error("Error processing payment verification:", error);
    return NextResponse.json(
      {
        message: "error",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
