import {NextRequest, NextResponse} from "next/server";
import connect from "@/dbConfig";
import {getDataFromToken} from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findById(userId).select('-password') // exclude password
        return NextResponse.json({
            message: 'user found',
            data: user
        })

    } catch (e: any) {
        return NextResponse.json({error: e.message}, {status: 400})
    }

}