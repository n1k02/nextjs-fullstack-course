import connect from "@/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import {getDataFromToken} from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {token, password} = reqBody

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: {$gt: Date.now()}
        })
        if (!user) {
            return NextResponse.json({message: 'Invalid token'}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)


        user.password = hashedPassword
        user.forgotPasswordToken = null
        user.forgotPasswordTokenExpiry = null
        const savedUser = await user.save()

        return NextResponse.json({message: 'Password updated', success: true})
    } catch (e: any) {
       return NextResponse.json({error: e.message}, {status: 500})
    }

}