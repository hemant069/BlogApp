
import axios from 'axios'
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'


const baseUrl: string | null = process.env.NEXT_PUBLIC_BACKEND || "http://localhost:8000/api";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],

    callbacks: {
        signIn: async ({ user, account, }) => {
            if (account?.provider === 'google') {
                try {
                    const res = await axios.post(`${baseUrl}/login`, {
                        username: user.name,
                        email: user.email,
                        provider: "google",
                        profileImg: user.image,
                    }, { withCredentials: true });

                    // DEBUG: Log the entire response
                    console.log("Backend response:", res.data);
                    console.log("Response status:", res.status);

                    if (res.status === 200 && res.data.token) {
                        // Try different possible field names from your backend
                        const mongoId = res.data._id || res.data.userId || res.data.id;
                        const username = res.data.username || user.name;

                        console.log("Extracted mongoId:", mongoId);
                        console.log("Extracted username:", username);

                        // Store in user object
                        user.mongoId = mongoId;
                        user.backendToken = res.data.token;
                        user.username = username;

                        return true;
                    }
                    return false;
                } catch (error) {
                    console.error("OAuth login failed:", error);
                    return false;
                }
            }
            return true;
        },

        jwt: async ({ token, user, account }) => {
            if (account && user) {
                console.log("JWT callback - user object:", user);

                // Store all necessary data in token
                token.mongoId = user?.mongoId as string;
                token.backendToken = user?.backendToken as string;
                token.email = user.email;
                token.name = user.name;
                token.picture = user.image;
                token.username = user.name;


            }
            return token;
        },

        session: async ({ session, token }) => {


            // Add all necessary data to session
            session.user.mongoId = token.mongoId;
            session.user.id = token.mongoId;
            session.user.username = token.username;
            session.backendToken = token.backendToken;

            return session;
        }
    },

    session: {
        strategy: 'jwt',
    },

    secret: process.env.NEXTAUTH_SECRET,
}

