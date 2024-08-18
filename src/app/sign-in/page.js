"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { url } from "../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { updatePremium, updateUser } from "../Redux/userSlice";

const SignInPage = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((store) => store.user);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch(`${url}api/v1/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const resp = await res.json();

    if (resp.success) {
      dispatch(updateUser(resp.user._id));
      dispatch(updatePremium(resp.user.premium));
      router.push("/dashboard");
    } else {
      setError("Wrong credentials. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#2c2c2c" }}
    >
      <div
        className="max-w-md w-full bg-gray-700 shadow-md rounded px-8 py-6"
        style={{ backgroundColor: "#4c4c4c" }}
      >
        <div className="flex justify-center mb-4">
          <Image
            src="https://i.pinimg.com/originals/0b/92/c1/0b92c1ba5ae239c314ba2ec1dab936ec.png"
            alt="Sign In Image"
            width={100}
            height={100}
          />
        </div>
        <h2 className="text-2xl font-semibold text-center text-white mb-4">
          SIGN IN
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: "#fff", color: "#000" }}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: "#fff", color: "#000" }}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-white font-medium">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
