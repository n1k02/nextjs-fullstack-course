import connect from "@/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";
import {sendEmail} from "@/helpers/mailer";


connect()

// receive token
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {email} = reqBody

        if (!email) {
            return NextResponse.json({error: 'Email is empty'}, {status: 400})
        }
        console.log(email)

        const user = await User.findOne({email})
        if(!user) {
            return NextResponse.json({error: 'The user with this email was not found'}, {status: 400})
        }

        await sendEmail({email, emailType: 'RESET', userId: user._id})

        return NextResponse.json({message: 'Message sent', success: true})

    } catch (e: any) {
        return NextResponse.json({error: e.message}, {status: 500})
    }


}