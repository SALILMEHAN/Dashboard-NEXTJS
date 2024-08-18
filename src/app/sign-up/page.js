"use client";
import { url } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignupPage = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const signupUser = async (e) => {
    e.preventDefault();
    // console.log('Signup button clicked');

    const res = await fetch(`${url}api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        phone,
        address,
        isActive,
        isAdmin,
      }),
    });

    if (res.ok) {
      router.push("/sign-in");
    } else {
      console.error("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2c2c2c]">
      <form
        onSubmit={signupUser}
        className="bg-[#4c4c4c] p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-white">Sign Up</h1>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 rounded bg-white text-black"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 rounded bg-white text-black"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 rounded bg-white text-black"
        />
        <input
          type="phone"
          placeholder="Phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full p-2 rounded bg-white text-black"
        />
        <select
          name="isAdmin"
          id="isAdmin"
          onChange={(e) => setIsAdmin(e.target.value === "true")}
          className="w-full p-2 rounded bg-white text-black"
        >
          <option value={false}>Is Admin?</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <select
          name="isActive"
          id="isActive"
          onChange={(e) => setIsActive(e.target.value === "true")}
          className="w-full p-2 rounded bg-white text-black"
        >
          <option value={true}>Is Active?</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <textarea
          name="address"
          id="address"
          rows="4"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 rounded bg-white text-black"
        ></textarea>
        <button
          type="submit"
          className="w-full p-2 rounded bg-blue-500 text-white"
        >
          Sign Up
        </button>
        <p className="text-center text-white">
          Already have an account?{" "}
          <a href="/sign-in" className="text-blue-400">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
