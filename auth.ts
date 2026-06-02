import NextAuth from "next-auth"
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from "./src/lib/prisma"
import z from 'zod'
import bcrypt from 'bcryptjs'

const ONE_MONTH = 60 * 60 * 24 * 30

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: ONE_MONTH
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {}
      },

      authorize: async(credentials) => {
        const parsedCredentials = z.object({
          email: z.string().email(),
          password: z.string().min(6)
        }).safeParse(credentials)
        
        // null - el login falló
        if(!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data

        // if(!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: {
            // email: String(credentials.email)
            email: email
          }
        })
        // if(!user?.password) return null
        if(!user) return null

        const validPassword = await bcrypt.compareSync(
          // String(credentials.password),
          password,
          String(user.password)
        )
        if(!validPassword) return null

        const { password: _, ...rest} = user

        console.log({rest})

        return rest
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account'
  }
})