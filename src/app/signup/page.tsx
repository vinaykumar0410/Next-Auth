"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
      email: "",
      password: "",
      username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
      try {
          setLoading(true);
          const response = await axios.post("/api/users/signup", user);
          console.log("Signup success", response.data);
          toast.success("User created successfully. Redirecting to login...");
          router.push("/login");
      } catch (error: any) {
          console.log("Signup failed", error.message);
          toast.error(`Signup failed: ${error.response?.data?.error || error.message}`);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      if(user.email.length >= 10 && user.password.length >= 5 && user.username.length >= 5) {
          setButtonDisabled(false);
      } else {
          setButtonDisabled(true);
      }
  }, [user]);

  return (
    <>
      <h1 className="text-3xl text-blue-400 text-center mt-10">
        {loading ? "Processing...." : "Sign Up"}
      </h1>
      <div className="flex flex-col justify-center items-center">
        <label htmlFor="username" className="my-2">
          Username
        </label>
        <input
          type="text"
          required
          id="username"
          className="rounded p-2 max-w-md text-black"
          placeholder="Enter username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label htmlFor="email" className="my-2">
          Email
        </label>
        <input
          type="email"
          required
          id="email"
          className="rounded p-2 max-w-md text-black"
          placeholder="Enter email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="password" className="my-2">
          Password
        </label>
        <input
          type="password"
          required
          id="password"
          className="rounded p-2 max-w-md text-black"
          placeholder="Enter password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          onClick={onSignup}
          className="my-7 p-3 rounded border-solid border-2 border-sky-500"
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "No Sign Up" : "Sign Up Here"}
        </button>
        <Link href="/login">
          Already have an account?{" "}
          <span className="text-blue-500">Login Here</span>
        </Link>
      </div>
    </>
  );
}
