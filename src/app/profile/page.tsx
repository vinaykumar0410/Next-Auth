"use client"

import { sendEmail } from "@/helpers/mailer";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Profile() {
    const [data,setData] = useState('nothing')
    const router = useRouter()
    const logout = async ()=>{
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error : any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async ()=>{
      const response = await axios.get('/api/users/me')
      console.log(response.data);
      setData(response.data.data._id)
    }

  const handleResetPassword = ()=>{
    router.push('/forgotpassword')
  }

  return (
    <>
      <center>
        <h1 className="my-10 text-3xl">Profile Page</h1>
        <h2 className="text-blue-400">{data === 'nothing' ? '' : <Link href={`/profile/${data}`}>{data}</Link> }</h2>
          <button onClick={getUserDetails} className="mt-10 py-2 px-4 bg-blue-600 text-white rounded-lg font-medium">Get User Details</button>
      </center>
    </>
  );
}
