import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { connect } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(resquest) {
    try{

        const {userId} = getAuth(resquest);

        await connectDB();
        const user = await User.findById(userId);

        if (!user){
            return NextResponse.json({
                success: false,
                message: error.message
            });
        }

        return NextResponse.json({success: true, user});
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }
}