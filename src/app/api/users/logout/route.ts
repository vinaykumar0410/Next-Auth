import { NextResponse } from "next/server";
import toast from "react-hot-toast";

export async function GET(){
    try {
        const response =  NextResponse.json({
            message : 'Logout Successful',
            success : true
        })
        response.cookies.set("token","",{httpOnly:true,expires:new Date(0)})
        return response
    } catch (error : any) {
        console.log(error.message);
        toast.error(error.message)
    }
}