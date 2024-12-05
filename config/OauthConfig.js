import GoogleProvider from 'next-auth/providers/google';
import { SESSION_MAX_AGE, JWT_MAX_AGE } from '@/utils/constant';
import { cookies } from 'next/headers';
export const config = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_AUTH_CLIENTID,
      clientSecret: process.env.NEXT_GOOGLE_AUTH_CLIENTSECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: SESSION_MAX_AGE, // Set session max age (in seconds), e.g., 30 days
  },
  secret: process.env.NEXTAUTH_SECRET, // Make sure this matches your .env variable
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // Ensure consistency with your secret
    maxAge: JWT_MAX_AGE, // Set JWT max age (in seconds), e.g., 30 days
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token', // Session cookie name
      options: {
        httpOnly: true, // Ensure the cookie is accessible only via HTTP (not JavaScript)
        secure: process.env.NODE_ENV === 'production', // Only send cookies over HTTPS in production
        sameSite: 'none', // Set SameSite to Lax for cross-origin requests (adjust as needed)
        path: '/', // Path for the cookie
      },
    },
    callbackUrl: {
      name: 'next-auth.callback-url', // Cookie name for callback URL
      options: {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax', // Set SameSite for callback URL cookie
        path: '/',
      },
    },
  },
  callbacks: {
    async jwt({ token, account, profile }) {
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

      return session; // Always return the modified session object
    },
  },
};
