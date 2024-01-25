import { connectMongoDB } from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../domain/models/user";

export const GET = async (req: NextRequest) => {
    
  try {

    const { email } = await req.json();
    
    await connectMongoDB();

    const existingUser = await User.findOne({ email: email }).select("_id");

    return new NextResponse(JSON.stringify({ existingUser }), { status: 200 });
  } catch (error) {
    return new NextResponse("Internal server error while try to get user", {
      status: 500,
    });
  }
}
