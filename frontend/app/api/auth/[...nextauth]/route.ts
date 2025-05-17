import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Send this data to your backend
      const res = await fetch('http://localhost:8000/api/oauth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          username: user.name,
          providerId: account.providerAccountId,
        }),
      })

      const data = await res.json()
        console.log("OAUTH LOGIN RESPONSE:", res.status, data);

      // Optional: Save extra data in session or token
     return res.ok
    },

    async session({ session, token, user }) {
      // You can attach backend user info to the session here if needed
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
