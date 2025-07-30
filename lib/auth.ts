import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            teacher: true,
            parent: true,
            admin: true,
          },
        });

        if (!user) {
          throw new Error("Invalid Email Address!");
        }

        const passwordValid = await compare(
          credentials.password,
          user.password
        );

        if (!passwordValid) {
          throw new Error("Invalid Password!");
        }

        console.log(user);
        // Get profile ID based on role
        let profileId = null;
        if (user.role === "TEACHER" && user.teacher) {
          profileId = user.teacher.id;
        } else if (user.role === "PARENT" && user.parent) {
          profileId = user.parent.id;
        } else if (user.role === "ADMIN" && user.admin) {
          profileId = user.admin.id;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          isFirstLogin: user.isFirstLogin,
          profileId: profileId || "",
        };
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role as string;
        session.user.profileId = token.profileId as string;
        session.user.isFirstLogin = token.isFirstLogin as boolean;
      }
      return session;
    },
    // Remove the first jwt callback and keep only this one
    async jwt({ token, user }: any) {
      if (user) {
        // When signing in
        token.id = user.id;
        token.role = user.role;
        token.profileId = user.profileId;
        token.isFirstLogin = user.isFirstLogin;
      } else {
        // On subsequent requests, refresh user data
        const dbUser = await prisma.user.findUnique({
          where: {
            email: token.email,
          },
          include: {
            teacher: true,
            parent: true,
            admin: true,
          },
        });

        if (dbUser) {
          // Update token with the latest user data
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.isFirstLogin = dbUser.isFirstLogin;

          // Get the correct profileId based on role
          let profileId = null;
          if (dbUser.role === "TEACHER" && dbUser.teacher) {
            profileId = dbUser.teacher.id;
          } else if (dbUser.role === "PARENT" && dbUser.parent) {
            profileId = dbUser.parent.id;
          } else if (dbUser.role === "ADMIN" && dbUser.admin) {
            profileId = dbUser.admin.id;
          }

          token.profileId = profileId || "";
        }
      }

      return token;
    },
  },
};

export default NextAuth(authOptions);
