import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { supabase } from "@/lib/supabaseClient";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
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
          // User doesn't exist, so add them to the database
          const { data: newUser, error: insertError } = await supabase
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
      // Add user ID to the session
      if (session?.user) {
        const { data, error } = await supabase
          .from('users')
          .select('id')
          .eq('email', session.user.email)
          .single()

        if (data) {
          session.user.id = data.id
        }
      }
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
