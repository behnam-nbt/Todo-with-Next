import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import connectDB from "@/utils/DB";
import { verifyPassword } from "@/utils/auth";

const authOptions = {
    session: { strategy: "jwt" }, // Use JWT-based sessions
    secret: process.env.NEXTAUTH_SECRET, // Ensure secret is set
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    await connectDB();
                } catch (error) {
                    throw new Error("Database connection error!");
                }

                if (!email || !password) {
                    throw new Error("All fields are required!");
                }

                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error("User not found!");
                }

                const isValid = await verifyPassword(password, user.password);
                if (!isValid) {
                    throw new Error("Incorrect username or password!");
                }

                return { id: user._id.toString(), email };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && account.provider === "google") {
                token.id = user.id; 
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id; // Include user ID in session
            }
            return session;
        },
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 3600, // 1 hour
    },
    session: {
        maxAge: 3600, // 1 hour
        updateAge: 60, // Refresh every 60 seconds
    },
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;

export { authOptions };
