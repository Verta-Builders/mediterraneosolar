import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse, NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Enforce www prefix for production domain
  if (!hostname.includes('localhost') && hostname.match(/^mediterraneosolar\.com$/)) {
    url.hostname = 'www.mediterraneosolar.com';
    return NextResponse.redirect(url, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(es|en)/:path*']
};
