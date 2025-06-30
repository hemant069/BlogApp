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
        // Send this data to your backend
        console.log(user, account);

        const res = await axios.post("http://localhost:8000/api/login", {
          username: user.name,
          email: user.email,
          provider: "google",
          profileImg: user.image,
        }, { withCredentials: true });

        const data = res.data;
        console.log("data meri janeman", data);

        // Only allow sign-in if backend responds positively
        return res.status === 200;
      } catch (error) {
        console.error("OAuth login failed:", error.message);
        return false; // Deny sign-in on error
      }
    },


    async session({ session, token, user }) {
      // You can attach backend user info to the session here if needed
      console.log("Hey session ", session, user)
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  cookies: {
    sessionToken: {
      name: "token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
