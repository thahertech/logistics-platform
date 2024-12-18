import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useRouter } from 'next/router';
import Layout from '../app/Dashboard/Layout';
import Image from 'next/image';
import styles from '../app/Styles/login.module.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    yritys_nimi: '',
    phone: '',
    vat_number: '',
    termsAccepted: false,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      termsAccepted: e.target.checked,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Automatically format vat_number with a dash after the fourth number
    if (name === 'vat_number') {
      const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
      const formattedValue =
        numericValue.length > 7
          ? numericValue.slice(0, 7) + '-' + numericValue.slice(7)
          : numericValue; // Add dash after the 4th number if applicable
  
      setFormData((prev) => ({
        ...prev,
        vat_number: formattedValue,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
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
            display_name: formData.name,
            email: formData.email,
            password: formData.password,
          });

      if (error) throw error;

      if (!isLogin && data?.user?.id) {
        await supabase
          .from('profiles')
          .insert([{ user_id: data.user.id, full_name: formData.name.trim(), phone_number: formData.phone.trim() }]);
        setShowModal(true); // Show the verification modal
      }

      router.push('/profile');
    } catch (err) {
      console.error(err);
      setError('Virhe. Yritä uudelleen!');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-screen bg-black-200">
        <div className="bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-lg border border-gray-300 flex p-6 rounded-lg shadow-md w-full max-w-4xl">
          {/* Left Section - Image */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <Image
              src={"/assets/northern-lights.jpg"}
              alt="sunset-image"
              width="2000"
              height="500"
              className={styles.loginImg}
            />
          </div>

          {/* Right Section - Form */}
          <div className="flex flex-col flex-1 p-6">
  <h2 className="text-3xl font-bold mb-6 text-left text-white border-b">
    {isLogin ? 'Kirjaudu' : 'Luo Käyttäjä'}
  </h2>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-1">
                  <input
                    type="text"
                    name="name"
                    placeholder="Etunimi"
                    value={formData.name}
                    onChange={handleChange}
                    className={`text-black w-full p-2 mb-2 border rounded ${styles.inputField}`}
                    required
                  />
                </div>
              )}
              
              {!isLogin && (
                <div className="mb-1">
                  <input
                    type="text"
                    name="yritys_nimi"
                    placeholder="Yritys"
                    value={formData.yritys_nimi}
                    onChange={handleChange}
                    className={`text-black w-full p-2 mb-2 border rounded ${styles.inputField}`}
                    required
                  />
                </div>
              )}

              {!isLogin && (
                <div className="mb-1">
                  <input
                    type="text"
                    name="vat_number"
                    placeholder="Y-tunnus"
                    value={formData.vat_number}
                    onChange={handleChange}
                    className={`text-black w-full p-2 mb-2 border rounded ${styles.inputField}`}
                    required
                  />
                </div>
              )}


              {!isLogin && (
                <div className="mb-2">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Puhelinnumero"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`text-black w-full p-2 mb-4 border rounded ${styles.inputField}`}
                    required
                  />
                </div>
              )}
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Sähköposti"
                  className={`text-black border border-gray-300 p-2 w-full rounded ${styles.inputField}`}
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Salasana"
                  className={`text-black border border-gray-300 p-2 w-full rounded ${styles.inputField}`}
                  required
                />
              </div>

              {!isLogin && (
                <div className="mb-12">
                  <label className="flex items-center space-x-2 text-gray-400">
                    <input
                      type="checkbox"
                      name="terms"
                      onChange={handleCheckboxChange}
                      className={`form-checkbox h-5 w-5 ${styles.termsField}`}
                      required
                    />
                    <span>
                      Hyväksyn{' '}
                      <a
                        href="/ehdot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        käyttöehdot ja tietosuojakäytännön
                      </a>
                    </span>
                  </label>
                </div>
              )}
              <button
                type="submit"
                className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${styles.submitBtn} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : (isLogin ? 'Kirjaudu' : 'Luo Käyttäjä')}
              </button>

              {error && (
                <div className="text-white-500 mt-8 text-center">
                  <p>{error}</p>
                </div>
              )}
              <p className="mt-12 text-left text-white">
                {isLogin ? 'Ei käyttäjää?' : 'Oletko jo käyttäjä?'}
                <button
                  type="button"
                  className="text-black hover:underline ml-6"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? ' Luo käyttäjä' : 'Kirjaudu'}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>

            {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContainer}>
            <h3 className={styles.modalTitle}>Vahvista sähköpostiosoitteesi</h3>
            <p className={styles.modalText}>
              Vahvista tilisi käyttämällä lähetettyä linkkiä.
              <br />
              Katso roskaposti jos et löydä vahvistus sähköpostia.
            </p>
            <button onClick={closeModal} className={styles.modalButton}>
              OK
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Auth;