import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {

    try {
        
        const { email, name, password } = await req.json();

        return new NextResponse("New User has been registered", {status: 201})

    } catch(error) {

        return new NextResponse("Internal server error", {status: 500})
    }
};