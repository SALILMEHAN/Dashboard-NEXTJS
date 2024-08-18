"use client";
import React, { Suspense, useEffect } from "react";
import Buy from "./Buy";
import { useRouter } from 'next/navigation';
import Loading from "@/app/loading";
import { useSelector } from "react-redux";
import { url } from "@/app/lib/utils";

const BuyProduct = () => {
    const router = useRouter();
    const { id } = useSelector(store => store.user);
    // console.log('user in buy_product', id);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const makePayment = async ({ productId = null }) => {
        try {
            const key = process.env.NEXT_PUBLIC_RAZORPAY_API_KEY;
            // console.log(key);

            // const res = await fetch("http://localhost:3000/api/razorpay");
            const res = await fetch(`${url}api/razorpay`);

            if (!res.ok) {
                throw new Error(`Failed to fetch order details: ${res.statusText}`);
            }

            const { order } = await res.json();
            // console.log(order.id);

            const options = {
                key: key,
                name: "SALIL",
                currency: order.currency,
                amount: order.amount,
                order_id: order.id,
                description: "Understanding RazorPay Integration",
                handler: async function (response) {
                    // console.log(response);

                    try {
                        // const verifyRes = await fetch("http://localhost:3000/api/paymentverify", {
                        const verifyRes = await fetch(`${url}api/paymentverify`, {

                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                userId: id
                            }),
                        });

                        if (!verifyRes.ok) {
                            throw new Error(`Payment verification failed: ${verifyRes.statusText}`);
                        }

                        const verifyData = await verifyRes.json();
                        // console.log("response verify==", verifyData);

                        if (verifyData?.message === "success") {
                            // console.log("redirected.......");
                            router.push(`/paymentsuccess?paymentid=${response.razorpay_payment_id}`);
                        }
                    } catch (error) {
                        console.error("Error during payment verification:", error);
                        alert("Payment verification failed. Please try again.");
                    }
                },
                prefill: {
                    name: "Dashboard-NextJS-Salil",
                    email: "salilmehan123@gmail.com",
                    contact: "8076593098",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

            paymentObject.on("payment.failed", function (response) {
                alert("Payment failed. Please try again. Contact support for help");
            });
        } catch (error) {
            console.error("Error during payment process:", error);
            alert("Something went wrong. Please try again later.");
        }
    };

    return (
        <Suspense fallback={<Loading />}>
            <Buy makePayment={makePayment} />
        </Suspense>
    );
};

export default BuyProduct;
