"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = React.useState(false);

  const onResetPassword = async () => {
    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      console.log("Password mismatch.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", {
        password,
        token,
      });
      console.log("Password updated", response.data);
      toast.success("Password updated successfully");
      router.push("/login");
    } catch (error: any) {
      console.log("reset password fail " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <>
      <h1 className="text-center text-blue-400 text-2xl mt-10">
        {loading ? "Processing" : "Reset Password"}
      </h1>
      <div className="flex flex-col justify-center items-center">
        <label htmlFor="password" className="my-2">
          New Password
        </label>
        <input
          className="rounded p-2 max-w-md text-black"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="new password"
        />
        <label htmlFor="password" className="my-2">
          Confirm Password
        </label>
        <input
          className="rounded p-2 max-w-md text-black"
          id="password"
          type="password"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="confirm password"
        />

        <button
          onClick={onResetPassword}
          className="my-7 p-3 rounded border-solid border-2 border-sky-500"
        >
          Set New Password
        </button>
      </div>
    </>
  );
}
