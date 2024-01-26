import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/app/lib/mongodb";
import AppUser from "../../../../../domain/models/mongo/user";
import { SessionUser } from "../../../../../domain/models/session/session-user";
import { SignInCredentials } from "../../../../../domain/models/credentials/sign-in-credentials";


const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {

        const { email, password } = credentials as SignInCredentials;

        try {

          await connectMongoDB();

          const user = await AppUser.findOne({ email: email });

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
  callbacks: {

    async jwt({ token, user, session }) {

      if(user) {
        
        const sessionUser = user as SessionUser;

        return {
          ...token,
          id: sessionUser._id,
          createdAt: sessionUser.createdAt
        };

      }

      return token;
    },

    async session({ session, token }) {
      
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        createdAt: token.createdAt
        }
      };

    },
  },
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
