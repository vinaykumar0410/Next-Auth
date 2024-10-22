"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function Login(){

    const router = useRouter()
    const [user,setUser] = useState({
        email : "",
        password : ""
    })

    const [buttonDisabled,setButtonDisabled] = useState(false)
    const [loading,setLoading] = useState(false)

    const onLogin = async ()=>{
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login',user);
            toast.success("Login Successful")
            console.log(response.data);
            router.push('/profile')
            
        } catch (error : any) {
            console.log('Login failed' + error.message);
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(user.email.length > 10 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    },[user])

    return <>
    <h1 className="text-3xl text-center mt-10 text-blue-400">{loading ? "proccessing.." : "Login"}</h1>
    <div className="flex flex-col justify-center items-center">
        <label htmlFor="email" className="my-5">email</label>
        <input type="email" required id="email" className="rounded p-2 max-w-md text-black" placeholder="enter email" onChange={(e)=>setUser({...user,email:e.target.value})}  />
        <label htmlFor="password" className="my-5">password</label>
        <input type="password" required id="password" className="rounded p-2 max-w-md text-black" placeholder="enter password" onChange={(e)=>setUser({...user,password:e.target.value})}  />
        <button onClick={onLogin} className="my-7 p-3 rounded border-solid border-2 border-sky-500">{buttonDisabled ? "No login" : "Login Here"  }</button>
        <Link href="/forgotpassword" >Forgot Password ? <span className="text-blue-500">Reset here</span></Link>
        <Link href="/signup" >Don't have an Account ? <span className="text-blue-500">Signup Here</span></Link>
    </div>
    </>
}