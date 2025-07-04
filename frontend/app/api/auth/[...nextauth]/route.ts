import axios from 'axios'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'


const handler: NextAuthOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      try {
        const res = await axios.post("http://localhost:8000/api/login", {
          username: user.name,
          email: user.email,
          provider: "google",
          profileImg: user.image,
        }, { withCredentials: true });

        if (res.status == 200) {
          return true
        }
      } catch (error) {
        console.error("OAuth login failed:", error);
        return false;
      }
    },

    // Add JWT callback to customize the token
    jwt: async ({ token, user, account }) => {
      if (account && user) {
        // You can add custom data to the token here
        token.customData = user;
      }
      return token;
    },

    // Add session callback to pass token to client
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      return session;
    }
  },

  // Enable JWT strategy
  session: {
    strategy: "jwt"
  },

  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
