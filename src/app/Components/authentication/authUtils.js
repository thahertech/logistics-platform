import { supabase } from '@/supabaseClient';

const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
};



export const handleSubmit = async (e, isLogin, formData, setError, setIsLoading, setIsLogin, setFormData, setShowModal, router, toast) => {
  e.preventDefault();
  setIsLoading(true);

  if (!isValidEmail(formData.email)) {
    toast.error('Sähköposti on virheellinen');
    setIsLoading(false);
    return;
  }

  if (!isLogin && !formData.termsAccepted) {
    toast.error('Lue ja hyväksy käyttöehdot');
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
          phone: formData.phone,
          options: {
            data: {
              display_name: `${formData.name} ${formData.lastName}`,
            },
          },
        });

        if (error) {
          setError(error.message); 
          toast.error(`Virhe: ${error.message}`);
          return;
        }

    if (!isLogin && data?.user?.id) {
      await supabase
        .from('profiles')
        .insert([{
          user_id: data.user.id,
          user_role: formData.role,
          full_name: `${formData.name.trim()} ${formData.lastName.trim()}`,
          yritys_nimi: formData.yritys_nimi.trim(),
          phone_number: formData.phone,
          vat_number: formData.yTunnus.trim(),
        }]);
      
      toast.success(' Tarkista sähköpostiin lähetetty vahvistuslinkki.', {
        position: 'top-right',
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
      router.push('/auth');
      setIsLogin(true);

    } else {
      router.push('/oma-tili');
    }
  } catch (err) {
    toast.error('Tarkista sähköposti ja salasana!'); 
  } finally {
    setIsLoading(false);
  }
};

export const signInWithGoogle = (setIsLoading, setError, router) => handleOAuthSignIn('google', setIsLoading, setError, router);
export const signInWithApple = (setIsLoading, setError, router) => handleOAuthSignIn('apple', setIsLoading, setError, router);

const handleOAuthSignIn = async (provider, setIsLoading, setError, router) => {
  try {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      setError(error.message);
      toast.error(`Virhe: ${error.message}`);
    }
  } catch (error) {
    setError(error.message);
    toast.error(`Virhe: ${error.message}`);
  } finally {
    setIsLoading(false);
  }
};

export const handleForgotPassword = async (e, formData, setError, setIsLoading, setSuccessMessage) => {
  e.preventDefault();
  
  setSuccessMessage('');
  setIsLoading(true);

  if (!isValidEmail(formData.email)) {
    toast.error('Sähköposti on virheellinen');
    setIsLoading(false);
    return;
  }

  try {
    
    const { error } = await supabase.auth.resetPasswordForEmail(formData.email.trim());
    if (error) throw error;
    toast.success('Salasanan palautuslinkki lähetetty! Tarkista sähköpostiisi.');
  } catch (error) {
    toast.error('Ei onnistunut. Yritä uudelleen');
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};