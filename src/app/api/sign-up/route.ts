import { connectMongoDB } from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { MessageType } from "../../../../domain/enums/enums";
import AppUser from "../../../../domain/models/mongo/user";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {

  try {

    const { email, name, password } = await req.json();

    await connectMongoDB();

    const existingUser = await AppUser.findOne({ email: email });

    if (existingUser) {
      const response = { type: MessageType.Error, message: "Account already exists" };

      return new NextResponse(JSON.stringify(response), { status: 200 });
    } else {
      const response = {
        type: MessageType.Success,
        message: "New account has been registered",
      };

      const hashedPassword = await bcrypt.hash(password, 10);

      await AppUser.create({ name, email, password: hashedPassword });

      return new NextResponse(JSON.stringify(response), { status: 201 });
    }
  } catch (error) {
    return new NextResponse("Internal server error while try to sign up", {
      status: 500,
    });
  }
}
