import connect from "@/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";


connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token)

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()}
        }) // token and verifyExpiry > Date.now()

        if(!user) {
            return NextResponse.json({error: 'Invalid token'}, {status: 400})
        }
        console.log(user)

        user.isVerified = true
        user.verifyToken = undefined
        await user.save()

        return NextResponse.json({message: 'Email verified successfully', success: true})

    } catch (e:any) {
        return NextResponse.json({error: e.message}, {status: 500})
    }
}