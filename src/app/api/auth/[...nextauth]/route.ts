import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { ISODateString, NextAuthOptions, Session } from "next-auth";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/app/lib/mongodb";
import User from "../../../../../domain/models/user";

interface Credentials {
  email: string;
  password: string;
}

export interface UserSession {
  user:{
      id: string,
      name: string,
      email: string
  },
  expires?: ISODateString
}



const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {

        const { email, password } = credentials as Credentials;

        try {
          await connectMongoDB();

          const user = await User.findOne({ email: email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
