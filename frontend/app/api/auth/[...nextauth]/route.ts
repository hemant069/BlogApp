import axios from 'axios'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { useAuth } from '@/app/Context/AuthContext'

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



        // Only allow sign-in if backend responds positively
        if (res.status == 200) {
          return true
        }
      } catch (error) {
        console.error("OAuth login failed:", error);
        return false; // Deny sign-in on error
      }
    },



  },

  // cookies: {
  //   sessionToken: {
  //     name: "token",
  //     options: {
  //       path: "/",
  //       secure: process.env.NODE_ENV === "production",
  //     },
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
