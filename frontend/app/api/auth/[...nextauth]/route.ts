// app/api/auth/[...nextauth]/route.ts

import axios from 'axios'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler: NextAuthOptions = NextAuth({
  providers: [
    // Custom credentials provider
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const res = await axios.post("http://localhost:8000/api/login", {
            email: credentials.email,
            password: credentials.password,
            provider: 'credentials'
          }, { withCredentials: true });

          if (res.status === 201 && res.data.token) {
            // Your backend should return user details along with token
            return {
              id: res.data.userId || res.data.id,
              email: credentials.email,
              name: res.data.username,
              backendToken: res.data.token,
              mongoId: res.data.userId || res.data.id
            }
          }
          return null
        } catch (error) {
          console.error('Credentials auth error:', error)
          return null
        }
      }
    }),

    // Google OAuth provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],

  callbacks: {
    signIn: async ({ user, account, profile }) => {
      if (account?.provider === 'google') {
        try {
          const res = await axios.post("http://localhost:8000/api/login", {
            username: user.name,
            email: user.email,
            provider: "google",
            profileImg: user.image,
          }, { withCredentials: true });

          if (res.status === 200 && res.data.token) {
            // Your backend already returns the user data
            user.mongoId = res.data.userId || res.data.id || res.data._id;
            user.backendToken = res.data.token;
            user.username = res.data.username;

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

    // JWT callback to store all necessary data in token
    jwt: async ({ token, user, account }) => {
      if (account && user) {
        // Store all necessary data in token
        token.mongoId = user.mongoId;
        token.backendToken = user.backendToken;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.username = user.username || user.name;
      }
      return token;
    },

    // Session callback to pass data to client
    session: async ({ session, token }) => {
      // Add all necessary data to session
      session.user.mongoId = token.mongoId;
      session.user.id = token.mongoId;
      session.user.username = token.username;
      session.backendToken = token.backendToken;
      return session;
    }
  },

  // Enable JWT strategy
  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }