"use client";
import Image from "next/image";
import React from "react";
import BuyProduct from "@/components/razorpay/BuyProduct";

const TransactionsPage = () => {
  const handleCheckout = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleCheckout}>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row p-4 bg-gray-700 m-40 rounded">
          <Image
            src={
              "https://img.freepik.com/premium-vector/vip-premium-membership-golden-badge-white-background_12454-10125.jpg"
            }
            alt="Premium membership"
            width={250}
            height={250}
          />
          <div className="flex flex-col m-4 text-xl justify-between">
            <p>Become A Premium Member Now !!</p>
            <BuyProduct />
          </div>
        </div>
      </div>
    </form>
  );
};

export default TransactionsPage;
