// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import { config } from '@/config/OauthConfig';
const handler = NextAuth(config);

export { handler as GET, handler as POST };
