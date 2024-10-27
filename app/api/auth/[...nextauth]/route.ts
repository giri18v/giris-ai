import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { AuthOptions, Session } from "next-auth"
import { supabase } from "@/lib/supabaseClient"

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const { data, error } = await supabase
          .from('users')
          .select('id')
          .eq('email', user.email)
          .single()

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking user:', error)
          return false
        }

        if (!data) {
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              email: user.email,
              name: user.name,
              image: user.image,
              provider: account.provider,
              provider_id: account.providerAccountId
            })
            .single()

          if (insertError) {
            console.error('Error inserting user:', insertError)
            return false
          }
        }
      }
      return true
    },
    async session({ session, token }) {
      if (session?.user && token) {
        const { data } = await supabase
          .from('users')
          .select('id')
          .eq('email', session.user.email)
          .single()

        if (data) {
          return {
            ...session,
            user: {
              ...session.user,
              id: data.id as string
            }
          }
        }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    }
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
