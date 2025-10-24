import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    { message: 'Logout successful' },
    { status: 200 }
  );

  // Clear auth cookie
  response.cookies.set('auth_token', '', {
    httpOnly: true,
    secure: false, // Set to false for localhost development
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });

  return response;
}

