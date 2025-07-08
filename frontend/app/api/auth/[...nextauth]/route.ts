// app/api/auth/[...nextauth]/route.ts

import axios from 'axios'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'


const baseUrl: string | null = process.env.NEXT_PUBLIC_BACKEND || "http://localhost:8000/api";
const handler: NextAuthOptions = NextAuth({
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
        token.mongoId = user.mongoId;
        token.backendToken = user.backendToken;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.username = user.username || user.name;

        console.log("JWT callback - token object:", token);
      }
      return token;
    },

    session: async ({ session, token }) => {
      console.log("Session callback - token object:", token);

      // Add all necessary data to session
      session.user.mongoId = token.mongoId;
      session.user.id = token.mongoId;
      session.user.username = token.username;
      session.backendToken = token.backendToken;

      console.log("Session callback - final session:", session);
      return session;
    }
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }