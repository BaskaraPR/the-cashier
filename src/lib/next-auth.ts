import { Role } from "@prisma/client";
import {
  type DefaultSession,
  AuthOptions,
  getServerSession as nextAuthGetServerSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUser } from "../query/user.query";
import { compareHash } from "../lib/bcrypt";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user?: {
      id_user: string;
      role: Role;
      name: string;
      username: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id_user: string;
    role: Role;
    name: string;
    username: string;
  }
}

export const authOptions: AuthOptions = {
  theme: {
    colorScheme: "light",
    brandColor: "#E04E4E",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Jane Doe",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials) {
        try {
          const user = await findUser({ username: credentials?.username });
          if (!user?.password) return null;

          const isPasswordCorrect = compareHash(
            credentials?.password as string,
            user.password
          );

          if (!isPasswordCorrect) return null;

          const userPayload = {
            id: user.id_user,
            role: user.role,
            name: user.name,
            username: user.username,
          };

          console.log(userPayload);

          return userPayload;
        } catch (e) {
          console.error("Authorization error:", e);
          return null;
        }
      },
    }),
  ],
  // pages: {
  //   signIn: "/auth/login",
  //   error: "/auth/login",
  // },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith("/") ? new URL(url, baseUrl).toString() : url;
    },
    async signIn({ user }) {
      if (user.username) {
        const userdb = await findUser({ username: user.username });
        if (!userdb) {
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user?.username) {
        const userdb = await findUser({ username: user.username });
        if (userdb) {
          token.id_user = userdb.id_user;
          token.role = userdb.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id_user && session.user) {
        const userdb = await findUser({ id_user: token.id_user });
        if (userdb) {
          session.user.role = userdb.role;
          session.user.name = userdb.name;
          session.user.username = userdb.username;
          session.user.id_user = userdb.id_user;
        } else {
          // Handle case where user is not found
          session.user.role = "KASIR"; // default role if not found
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const getServerSession = () => nextAuthGetServerSession(authOptions);
