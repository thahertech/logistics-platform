import { supabase } from '@/supabaseClient';

export const handleSubmit = async (e, isLogin, formData, setError, setIsLoading, setFormData, setShowModal, router) => {
  e.preventDefault();
  setError(null);
  setIsLoading(true);

  if (!formData.email.includes('@')) {
    setError('Sähköposti on virheellinen');
    setIsLoading(false);
    return;
  }
  
  try {
    const { data, error } = isLogin
      ? await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })
      : await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            phone: formData.phone,
            display_name: `${formData.name} ${formData.lastName}`,
          },
        },
      });

    if (error) throw error;

    if (!isLogin && data?.user?.id) {
      await supabase
      .from('profiles')
      .insert([{
        user_id: data.user.id,
        user_role: formData.role,
        full_name: `${formData.name.trim()} ${formData.lastName.trim()}`,
        yritys_nimi: formData.yritys_nimi.trim(),
        phone_number: formData.phone,
        vat_number: formData.yTunnus.trim()
      }]);  
      setShowModal(true);
      setFormData({
        email: '',
        password: '',
        name: '',
        lastName: '',
        yritys_nimi: '',
        phone: '',
        vat_number: '',
        termsAccepted: false,
        user_role: '',
      });
    } else {
      router.push('/oma-tili');
    }
  } catch (err) {
    setError('Tarkista sähköposti ja salasana!');
  } finally {
    setIsLoading(false);
  }
};

export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) console.error('Error signing in with Google:', error.message);
};
export const signInWithApple = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
  });
  if (error) console.error('Error signing in with Apple:', error.message);
};

export const handleForgotPassword = async (e, formData, setError, setIsLoading, setSuccessMessage) => {
  setError(null);
  setSuccessMessage('');
  setIsLoading(true);

  if (!formData.email.includes('@')) {
    setError('Sähköposti on virheellinen');
    setIsLoading(false);
    return;
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(formData.email);
    if (error) throw error;

    setSuccessMessage('Password reset link sent! Check your email.');
  } catch (error) {
    setError('Tarkista sähköposti ja yritä uudelleen');
  } finally {
    setIsLoading(false);
  }
};