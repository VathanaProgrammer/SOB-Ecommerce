"use client";
import React, { useState } from "react";
import { AxiosError } from "axios";
import api from "@/api/api";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post(
        "/register",
        {
          phone,
          username,
        },
        { withCredentials: true }
      );
      setMessage("Signup successful 🎉");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // Axios error
        setMessage(error.response?.data?.message || "Signup failed ❌");
      } else {
        setMessage("Something went wrong ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex justify-center items-center w-full">
      <form onSubmit={handleSignup} className="mt-4 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">LUXE</h1>
        <h2 className="text-lg font-medium text-center text-gray-600 mb-6">
          Fill your details to continue with us
        </h2>

        {/* First Name */}
        <div className="w-full mt-4">
          <label className="text-[16px] font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 min-h-[45px] py-2 border focus:outline-0 rounded-[5px] focus:border-blue-600 mt-2"
            required
          />
        </div>

        {/* Phone */}
        <div className="w-full mt-4">
          <label className="text-[16px] font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 min-h-[45px] py-2 border focus:outline-0 rounded-[5px] focus:border-blue-600 mt-2"
            required
          />
        </div>

        {/* Password
        <div className="w-full mt-4">
          <label className="text-[16px] font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 min-h-[45px] py-2 border focus:outline-0 rounded-[5px] focus:border-blue-600 mt-2"
            required
          />
        </div> */}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 active:scale-95 transition"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        {message && (
          <p className="text-center mt-2 text-sm text-red-500">{message}</p>
        )}

        <div className="mt-2 w-full">
          <p className="text-center text-[14px] font-medium">
            Already have an account?{" "}
            <span onClick={() => router.push("/sign-in")} className="text-blue-600 cursor-pointer">
              Login to your account
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
