import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody
        console.log(reqBody);
        
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({message:'user not found'},{status:404})
        } 
        
        const valid = await bcryptjs.compare(password,user.password)
        
        if(!valid){
            return NextResponse.json({message:'Invalid password'},{status:400})
        } 
        console.log(user);
        
        const tokenData = {
            id : user._id,
            email : user.email,
            username : user.username
        }

        const token = await jwt.sign(tokenData,process.env.SECRET_TOKEN!,{expiresIn:'1h'})

        const response = NextResponse.json({
            message : 'Login Successful',
            success : true
        })

        response.cookies.set("token",token,{httpOnly:true})

        return response;
    } catch (error : any) {
        console.log(error.message);
        return NextResponse.json({error : error.message },{status : 500})
    }
}