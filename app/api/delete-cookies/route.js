// app/api/delete-cookies/route.js
import { NextResponse } from 'next/server';
import { cookies as nextCookies } from 'next/headers'; // Import cookies from next/headers

export async function POST(req) {
  try {
    const body = await req.json();
    const { cookieKeys } = body;

    if (!cookieKeys || !Array.isArray(cookieKeys)) {
      return NextResponse.json(
        { message: 'Invalid cookie list provided' },
        { status: 400 }
      );
    }

    // Access request cookies using `cookies()` from next/headers
    const requestCookies = nextCookies();

    // Debugging: Log the request cookies
    cookieKeys.forEach((key) => {
      const cookieValue = requestCookies.get(key);
      console.log(`Cookie ${key}:`, cookieValue?.value || 'Not found');
    });

    // Create Set-Cookie headers to delete each cookie
    const response = NextResponse.json({
      message: 'Cookies deleted successfully',
    });

    cookieKeys.forEach((cookieName) => {
      response.cookies.set({
        name: cookieName,
        value: '', // Empty value
        path: '/', // Ensure it's applied site-wide
        expires: new Date(0), // Expired date to delete the cookie
      });
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting cookies' },
      { status: 500 }
    );
  }
}
