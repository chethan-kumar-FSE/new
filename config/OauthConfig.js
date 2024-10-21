import GoogleProvider from 'next-auth/providers/google';

export const config = {
  providers: [
    GoogleProvider({
      clientId:
        '1037827490511-m2je1b3d59ik9l4s5jacr9evu6uo8154.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // Set session max age (in seconds), e.g., 30 days
  },
  secret: process.env.NEXTAUTH_SECRET, // Make sure this matches your .env variable
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // Ensure consistency with your secret
    maxAge: 30 * 24 * 60 * 60, // Set JWT max age (in seconds), e.g., 30 days
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      console.log('account', account);
      console.log('profile', profile);
      // If account is available, it means this is the first time the user is signing in
      if (account?.provider === 'google') {
        token.sub = profile?.sub; // Add the OAuth ID (`sub`)
        token.firstName = profile?.given_name; // First name
        token.lastName = profile?.family_name; // Last name
      }
      return token; // Always return the token with any added information
    },

    async session({ session, token }) {
      // Attach the OAuth ID (`sub`) and additional fields to the session
      if (token?.sub) {
        session.user.oauthId = token.sub; // OAuth ID
        session.user.firstName = token.firstName; // First name
        session.user.lastName = token.lastName; // Last name
      }

      console.log('session-inautj', session.user);
      return session; // Always return the modified session object
    },
  },
};
