'use client';
import { useState } from 'react';
import { supabase } from '@/supabaseClient';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function VaihdaSalasana() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Salasanat eivät täsmää.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error('Salasanan vaihtaminen epäonnistui.');
    } else {
      toast.success('Salasana vaihdettu onnistuneesti.');
      router.push('/oma-tili');
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Vaihda salasana</h2>
        <input
          type="password"
          placeholder="Uusi salasana"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Vahvista salasana"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Tallennetaan...' : 'Tallenna'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: '#111',
    padding: '2rem',
    borderRadius: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '300px',
  },
  title: {
    color: 'white',
    textAlign: 'center',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#1DB954',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};