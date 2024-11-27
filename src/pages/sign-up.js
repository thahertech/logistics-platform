import { useState } from 'react';
import { supabase } from '../supabaseClient';

console.log('Supabase:', supabase);

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Handle Signup
  const handleSignup = async () => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        alert('Check your email for confirmation!');
      }
    } catch (err) {
      console.error('Error during sign-up:', err.message);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  // Handle Login
  const handleLogin = async () => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        console.log('Logged in successfully:', user);
        alert('Logged in successfully!');
      }
    } catch (err) {
      console.error('Error during login:', err.message);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      alert('Logged out successfully!');
    }
  };

  return (
    <div>
      <h1>Sign Up / Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={handleLogin}>Log In</button>
      <button onClick={handleLogout}>Log Out</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
