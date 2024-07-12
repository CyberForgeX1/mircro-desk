import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      profile(profile: any) {
        let userRole: string = 'user';
        if (profile?.email === 'bawdicsoft.dev@gmail.com') {
          userRole = 'admin';
        }
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) token.role = user.role;
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
