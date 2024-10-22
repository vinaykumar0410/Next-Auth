import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();
        
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({
                message: "User not found.",
                success: false
            }, { status: 404 });
        }

        await sendEmail({
            email: user.email,
            emailType: "RESET",
            userId: user._id
        });

        return NextResponse.json({
            message: "Email sent for password reset.",
            success: true,
        });

    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
        }, { status: 400 });
    }
}
