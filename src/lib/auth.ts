import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Apple({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!
    }),
  ],
};

export default NextAuth(authOptions);