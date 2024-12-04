//import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/',
    '/trending',
    '/:lang([a-z]{2})/:path*', // Matches routes like /kn/something-p98495 or /en/something-c983948
    '/profile/edit', // Specific route for profile edit
    '/comment/:id(\\d+)', // Specific route for comment with numeric id
    '/:path([a-zA-Z0-9-]+-[c-p]\\d+)', // Matches patterns like /andjakdnf-p454945 or /adjfknasdkj-c983495
  ],
};

export function middleware(request) {
  const url = request.nextUrl;
  const response = NextResponse.next();
  const pathName = url.pathname;

  const cookieStore = cookies();
  const isTokenPresent = cookieStore.get('next-auth.session-token')?.value;
  const isLanguagePresent = cookieStore.get('language')?.value;

  if (
    !isTokenPresent &&
    (pathName.startsWith('/setting') ||
      pathName.startsWith('/comment') ||
      pathName.startsWith('/profile/edit'))
  ) {
    return NextResponse.redirect(new URL('/login', url));
  }

  if (
    pathName.startsWith('/trending') ||
    (isLanguagePresent && pathName === '/')
  ) {
    response.cookies.set('language', 'en', {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  }

  // Patterns to match
  const langPattern = /^\/([a-z]{2})\/[a-zA-Z0-9-]*(-[cp])?\d*$/; // Matches /{two-letter}/{something-p<number>}
  const langOnlyPattern = /^\/([a-z]{2})$/; // Matches just the two-letter language code
  const fallbackPattern = /^\/[a-zA-Z0-9-]+[-c]*\d*$/; // Matches /something-p<number> or /something-c<number>

  const isLanguageCookieSame = ({ language }) => {
    return isLanguagePresent && language === isLanguagePresent;
  };
  // Check if the URL matches the language pattern with a path
  if (langPattern.test(pathName) || langOnlyPattern.test(pathName)) {
    const language = url.pathname.split('/')[1];

    if (isLanguageCookieSame({ language })) return response;
    // Extract two-letter language code
    response.cookies.set('language', language, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    }); // Set cookie for language
  } else if (fallbackPattern.test(url.pathname)) {
    response.cookies.set('language', 'en', {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    }); // Set default language cookie
  }
  return response; // Return the modified response
}
