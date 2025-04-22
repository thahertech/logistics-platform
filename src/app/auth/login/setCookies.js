import { setCookie } from 'nookies';

const signInWithEmail = async (email, password, setIsLoading, setError, router) => {
  setIsLoading(true);
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Save the session token in a cookie
    setCookie(null, 'supabase.auth.token', data.session.access_token, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'Strict',
    });

    // Redirect to the dashboard or another page
    router.push('/dashboard');
  } catch (err) {
    console.error(err);
    setError('Login failed');
  } finally {
    setIsLoading(false);
  }
};

const signInWithGoogle = async (setIsLoading, setError, router) => {
    setIsLoading(true);
    try {
      const { user, session, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
  
      if (error) {
        setError(error.message);
        return;
      }
  
      // Save the session token in a cookie
      setCookie(null, 'supabase.auth.token', session.access_token, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'Strict',
      });
  
      // Redirect to the dashboard or another page
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Login failed');
    } finally {
      setIsLoading(false);
    }
  };