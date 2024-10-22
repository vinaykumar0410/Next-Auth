"use client"

import axios from "axios"
import Link from "next/link"
import React,{useState, useEffect} from "react"
import toast from "react-hot-toast"

export default function VerifyEmailPage(){
    const [token,setToken] = useState('')
    const [verified,setVerified] = useState(false)

    const verifyUserEmail = ()=>{
        try {
            axios.post('/api/users/verifyemail',{token})
            setVerified(true)
            toast.success("Email Verified")
        } catch (error:any) {
            console.log(error);
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || '')
    },[])

    useEffect(()=>{
        verifyUserEmail()
    },[token])


    return <center>
        <h1 className="mt-10 text-3xl">Email Verification</h1>
        <h2 className="my-5 text-blue-400">{token ? `${token}` : 'no token'}</h2>
        {
            verified && <div>
                <h2 className="my-7 text-xl text-green-400">Email Verified</h2>
                <Link href='/login' className="my-7 py-3 px-6 rounded border-solid border-2 border-sky-500">Login</Link>
            </div>
        }
    </center>
} 