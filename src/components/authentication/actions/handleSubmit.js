import { supabase } from '@/supabaseClient';
import { isValidEmail } from '../validateEmail';
import { checkSession } from '../checkSession';
import { setSessionCookie } from '../setSessionCookie';

export const handleSubmit = async (
  e, isLogin, formData, setError, setIsLoading,
  setIsLogin, setFormData, setShowModal, router, toast
) => {
  e.preventDefault();
  setIsLoading(true);

  const session = await checkSession();
  if (session) {
    router.push('/oma-tili');
    setIsLoading(false);
    return;
  }

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
      setIsLoading(false);
      return;
    }

    if (data?.session) {
      await setSessionCookie(data.session.access_token);
    }

    if (!isLogin && data?.user?.id) {
      await supabase.from('profiles').insert([{
        user_id: data.user.id,
        user_role: formData.role,
        full_name: `${formData.name.trim()} ${formData.lastName.trim()}`,
        yritys_nimi: formData.yritys_nimi.trim(),
        phone_number: formData.phone,
        vat_number: formData.yTunnus.trim(),
      }]);

      toast.success('Tarkista sähköpostiin lähetetty vahvistuslinkki.');
      setShowModal(true);
      setFormData({
        email: '', password: '', name: '', lastName: '',
        yritys_nimi: '', phone: '', vat_number: '',
        termsAccepted: false, user_role: '',
      });
      router.push('/auth/login');
      setIsLogin(true);
    } else {
      router.push('/oma-tili');
    }
  } catch (err) {
    toast.error('Tarkista sähköposti ja salasana!');
    console.error(err);
  } finally {
    setIsLoading(false);
  }
};