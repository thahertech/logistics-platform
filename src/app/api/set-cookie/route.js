// /app/api/set-cookie/route.js

import { NextResponse } from 'next/server';
import { supabase } from '@/supabaseClient'; // Import your supabase client

export async function POST(req) {
  const { access_token } = await req.json(); // Get the token from the request body

  // Set HTTP-only cookie
  const response = NextResponse.json({ message: 'Cookie set successfully' });

  response.cookies.set('supabase.auth.token', access_token, {
    httpOnly: true,  // Only accessible by the server
    secure: process.env.NODE_ENV === 'production', // Ensure it's secure in production
    path: '/', // Set the cookie for the entire domain
    maxAge: 60 * 60 * 24 * 7, // Cookie will expire in 7 days
    sameSite: 'Strict', // Prevent cross-site cookie leaks
  });

  return response;
}