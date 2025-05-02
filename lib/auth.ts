import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/db";
// Extend the Session type to include the id property
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

// Define authentication options
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    signIn: async ({ user }) => {
      if (!user.email) {
        return false;
      }

      const existing = await prisma.user.findFirst({ 
        where: { email: user.email } 
      });

      if (!existing) {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name || user.email.split('@')[0],
          },
        });
      }

      return true;
    },
  },
};
