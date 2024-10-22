import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody
        const user = await User.findOne({ email })
        if(user) {
            return NextResponse.json({ error: 'User already Exists' }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        console.log(hashedPassword);
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);
        
        await sendEmail({email,emailType:'VERIFY',userId:savedUser._id})

        return NextResponse.json({ message: 'User created successfully', success: true, savedUser})
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
