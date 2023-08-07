import Credentials from "next-auth/providers/credentials";
import { AuthOptions, ISODateString, User } from "next-auth";
import prisma from "@/database/db.config";
import { JWT } from "next-auth/jwt";

// * Custom Types

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}

export interface CustomUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: CustomSession;
      token: JWT;
      user: User;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: {
          type: "email",
          name: "email",
        },
        password: { type: "password", name: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          select: {
            id: true,
            name: true,
            email: true,
          },
          where: {
            email: credentials?.email,
          },
        });

        if (user) {
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          };
        } else {
          return null;
        }
      },
    }),
  ],
};
