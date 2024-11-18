/* eslint-disable @typescript-eslint/no-explicit-any */


import Authentication from "@/services/authentication";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import NextAuth, { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text", placeholder: "jsmith" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    console.log(process.env);
                    const Auth = new Authentication();
                    const user = await Auth.signIn(credentials?.email, credentials?.password) as any;

                    console.log({ user })

                    return user;
                } catch (error) {
                    console.log("ERRORR", error);
                    return null;
                }
            },
        }),
    ],
    debug: process.env.NODE_ENV === "development",
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async session({ session, token }: any) {
            session.user = token.user;
            return session;
        },

        async jwt({ token, user, trigger, session }: any) {
            if (trigger === "update") {
                token.user = session.user;
            }

            if (user) {
                token.user = user;
            }
            return token;
        },
    },
};

export function auth(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, authOptions);
}

export default NextAuth(authOptions);
