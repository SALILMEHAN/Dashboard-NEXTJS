"use client"
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Buy = ({ makePayment }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isPremium, setIsPremium] = useState(false);
    const { premium } = useSelector((store) => store.user);

    useEffect(() => {
        setIsPremium(premium);
    }, [])



    return (
        <div className="flex flex-col items-center justify-center mt-[100px]">
            <button
                onClick={() => {
                    makePayment({ productId: "example_ebook" });
                }}
                disabled={isLoading || isPremium}
                className={`bg-blue-600 h-10 w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
            >
                {isLoading ? 'Processing...' : isPremium ? 'Premium Already' : 'Buy Now'}
            </button>



        </div>
    );
};

export default Buy;