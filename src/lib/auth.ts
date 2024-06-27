import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Resend from "next-auth/providers/resend"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      from: "no-reply@clofish.amspaceseth.net",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (["dev@amspaceseth.net", "nate@qstreet.org"].includes(user.email!)) {
        return true
      }

      if (await prisma.user.findUnique({ where: { email: user.email! } })) {
        return true
      }

      return false
    },
  },
})
