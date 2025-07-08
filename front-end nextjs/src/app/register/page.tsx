"use client";
import Header from "../../components/Header";
import axios from "axios";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const [TheError, setTheError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/user/register", {
        email,
        password,
      });
      if (res) {
        console.log(res.data);
      } else {
        console.log("No response received");
      }
      setTheError("");
      router.push("/");
    } catch (error:any) {
      setTheError(error.response.data.message);
    }
  };
  return (
    <div>
      <Header />
      <div className="max-w-md mx-auto mt-12 p-6 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-center text-2xl mb-5">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button type="submit" className="bg-amber-300 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
        </form>
        <p className="text-center mt-5 text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:text-blue-800">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;