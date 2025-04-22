'use-client';
import { redirect } from 'next/navigation';
import { supabase } from '@/supabaseClient';

export default async function AuthCallback() {

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  
  if (!user || userError) {
    console.error('User not found or error occurred:', userError);
    return redirect('/auth/login'); // Consider redirecting to login or an error page
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || !profile.company_name || !profile.role || profileError) {
    return redirect('/complete-profile');
  }

  return redirect('/oma-tili');
}