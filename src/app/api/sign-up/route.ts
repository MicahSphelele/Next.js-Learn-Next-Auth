import { connectMongoDB } from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {

    try {
        
        const { email, name, password } = await req.json();

        await connectMongoDB();

        const existingUser = await User.findOne({email: email});

        if(existingUser) {
             
            const response = { type: "error", message: "Account already exists" };

            return new NextResponse(JSON.stringify(response), {status: 200})

        } else {
            
            const response = { type: "success", message: "New account has been registered" };

            const hashedPassword = await bcrypt.hash(password, 10);

            await User.create({ name, email, password: hashedPassword });

            return new NextResponse(JSON.stringify(response), {status: 201})
        }


    } catch(error) {

        return new NextResponse("Internal server error while try to sign up", {status: 500})
    }
};