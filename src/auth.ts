import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { safeCompare } from "@/lib/security";
import { loginSchema } from "@/lib/validation";

export const authConfig = {
  pages: {
    signIn: "/admin/login"
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8
  },
  useSecureCookies: process.env.NODE_ENV === "production",
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const user = await prisma.adminUser.findUnique({
          where: { email: parsed.data.email.toLowerCase() }
        });

        if (!user) {
          const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
          const configuredPassword = process.env.ADMIN_PASSWORD;
          const matchesConfiguredAdmin =
            configuredEmail === parsed.data.email.toLowerCase() &&
            Boolean(configuredPassword && configuredPassword.length >= 12 && safeCompare(parsed.data.password, configuredPassword));

          if (!matchesConfiguredAdmin || !configuredPassword || await prisma.adminUser.count() > 0) {
            return null;
          }

          return prisma.adminUser.create({
            data: {
              email: parsed.data.email.toLowerCase(),
              name: process.env.ADMIN_NAME?.trim() || "Portfolio Admin",
              passwordHash: await bcrypt.hash(configuredPassword, 12)
            }
          });
        }

        const validPassword = await bcrypt.compare(parsed.data.password, user.passwordHash);

        if (!validPassword) {
          return null;
        }

        await prisma.adminUser.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() }
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = "role" in user ? user.role : "OWNER";
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "OWNER" | "EDITOR";
      }

      return session;
    }
  }
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
