"use client";
import Link from "next/link";
import React,{ useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



export default function ForgotPasswordPage(){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = React.useState(false);

    const onForgotPassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post("api/users/forgotpassword",{email});
            toast.success("Check your email")
            console.log("Email Sent", response.data);
            setEmail('')
        } catch (error: any) {
            toast.error("user not found")
            console.log("reset password fail " + error.message);
        }finally{
            setLoading(false);
        }
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl text-blue-400 mb-5">{loading ? "Processing" : "Forgot Password"}</h1>
            <label htmlFor="email">Email</label>
            <input
            className="p-2 rounded-md m-2 text-black"
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                />
            <button
            onClick={onForgotPassword} 
            className="my-7 py-2 px-6 rounded border-solid border-2 border-sky-500">Submit</button>
            <Link href="/signup">Back to <span className="text-blue-400">Signup</span> page</Link>
        </div>
    )
}