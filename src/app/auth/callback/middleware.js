import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  await supabase.auth.getSession(); // refresh session if needed

  return res;
}

export const config = {
  matcher: ['/auth/callback', '/auth/vahvista-tili','/auth/reset-password', '/complete-profile'], // routes where session is needed
};