import { supabase } from '../../supabaseClient'; // import your Supabase client

const SignOutButton = () => {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      console.log('Successfully signed out');
      // Optionally redirect the user after sign-out
      window.location.href = '/login'; // Redirect to login page or home page
    }
  };

  return (
    <button onClick={handleSignOut} className="btn-sign-out">
      Sign Out
    </button>
  );
};

export default SignOutButton;