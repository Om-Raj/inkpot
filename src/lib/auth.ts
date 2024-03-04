import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import type { Adapter } from 'next-auth/adapters'
import prisma from "./db"
import { NextAuthOptions } from "next-auth"
import { compare } from "bcrypt"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-out',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "youremail@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUser = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })
        if (!existingUser) {
          return null;
        }
        
        const passwordMatch = await compare(credentials.password, existingUser.password!)

        if (!passwordMatch) {
          return null 
        }

        return {
          id: `${existingUser.id}`,
          name: existingUser.name,
          email: existingUser.email
        }
      }
    })
  ],
  callbacks: {
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name
        }
      }
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          name: user.name
        }
      }
      return token
    }
  }
}
