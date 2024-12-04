// app/api/setCookies/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const payload = await request.json();

  // Perform validation: Ensure payload is not empty
  console.log('parload', payload);
  if (!payload || Object.keys(payload).length === 0) {
    return NextResponse.json({ error: 'No data provided' }, { status: 400 });
  }

  // Set cookie options
  const cookieOptions = {
    // httpOnly: true, // Prevents client-side access to the cookie
    // secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 60 * 60 * 24 * 24 * 24, // Cookie expiration: 24 days
    path: '/', // Path where the cookie is accessible
  };

  const response = NextResponse.json({ message: 'Cookies set successfully' });

  // Iterate over each key in the payload and set cookies
  for (const [key, value] of Object.entries(payload)) {
    response.cookies.set(key, value, cookieOptions);
  }

  return response;
}
