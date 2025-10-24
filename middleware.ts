import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyTokenEdge } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Debug: Log all cookies
  console.log('[Middleware] All cookies:', request.cookies.getAll().map(c => `${c.name}=${c.value.substring(0, 20)}...`));
  console.log('[Middleware] Auth token:', token ? `${token.substring(0, 20)}...` : 'NOT FOUND');

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/register'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // If user is authenticated and trying to access login/register, redirect to home
  if (token && isPublicPath) {
    const user = verifyTokenEdge(token);
    if (user) {
      if (user.role === 'admin') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // If user is not authenticated and trying to access protected routes
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Check admin routes
  if (pathname.startsWith('/admin')) {
    if (!token) {
      console.log('[Middleware] No token found for /admin access');
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    const user = verifyTokenEdge(token);
    console.log('[Middleware] User trying to access /admin:', user);
    
    if (!user || user.role !== 'admin') {
      console.log('[Middleware] Access denied - User is not admin');
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    console.log('[Middleware] Admin access granted');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/admin', '/admin/:path*', '/login', '/register'],
};

