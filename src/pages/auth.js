import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/supabaseClient';
import Layout from '../app/Dashboard/Layout';
import FormFields from '../app/Components/forms/AuthForm';
import Modal from '../app/Components/modals/LoginModal';
import { handleSubmit, signInWithGoogle, signInWithApple, handleForgotPassword } from '@/app/Components/authUtils';
import styles from '../app/Styles/login.module.css';
import Image from 'next/image';
import ParticleBackground from '@/app/Components/bg-animation';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    lastName: '',
    yritys_nimi: '',
    yTunnus: '',
    phone: '',
    vat_number: '',
    termsAccepted: false,
    user_role: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  return (
    <Layout>
      <div className={styles.bg}>
            <ParticleBackground/> {/* Include the particle background */}
            </div>
      <div className={`${styles.authPageBackground} flex justify-center items-center`}>
      <div className="bg-black bg-opacity-70 mt-6 backdrop-filter backdrop-blur-lg border border-gray-300 flex p-6 rounded-lg shadow-md w-full max-w-4xl">          <div className="hidden md:flex flex-1 items-center justify-center">
            <Image
              src={"/assets/3d.jpg"}
              alt="sunset-image"
              width="2000"
              height="500"
              className={styles.loginImg}
            />
          </div>
          <div className="flex flex-col flex-1 p-4">
            <h2 className="text-4xl font-bold mb-12 text-left text-white mb-8 pb-2.5 border-b border-white/90">
              {isLogin ? 'Kirjaudu' : 'Luo Käyttäjä'}
            </h2>
            <form onSubmit={(e) => handleSubmit(e, isLogin, formData, setError, setIsLoading, setFormData, setShowModal, router)}>
              <FormFields 
                isLogin={isLogin} 
                formData={formData} 
                setFormData={setFormData} 
                error={error}
                isLoading={isLoading} 
                setIsLoading={setIsLoading}
                handleForgotPassword={(e) => handleForgotPassword(e, formData, setError, setIsLoading, setShowModal)} 
              />
            </form>
            {/* Google Sign-In Button
            <div className="flex flex-col items-center mt-6">
  <button
    type="button"
    onClick={() => signInWithGoogle(setIsLoading, setError, router)}
    className=" flex justify-center items-center"
  >
    {isLoading ? (
      <span>Loading...</span>
    ) : (
      <img
        src="/assets/signin-assets/Web (mobile + desktop)/svg/dark/web_dark_rd_ctn.svg " // Path to your PNG image
        alt="Sign in with Google"
        width={200}
        height={200}
        className="cursor-pointer"
      />
    )}
  </button>
  <button 
    type="button"
    onClick={() => signInWithApple(setIsLoading, setError, router)}
    className=" flex justify-center items-center mt-2"
    >
  <img 
  src="/assets/apple-account-continue-with~dark@2x.png"
  alt="sign in with apple"
  width={200}
  height={200}
  className="cursor-pointer"
/>
</button>
</div> */}
            {/* Switch between Login and Register */}
            <p className=" text-left text-gray-300">
              {isLogin ? (
                <span>Ei tiliä? <button onClick={() => setIsLogin(false)} className="text-white underline">Luo tili</button></span>
              ) : (
                <span>Onko jo tili? <button onClick={() => setIsLogin(true)} className="text-white underline">Kirjaudu sisään</button></span>
              )}
            </p>
          </div>
        </div>
      </div>
      {showModal && <Modal closeModal={() => setShowModal(false)} />}
    </Layout>
  );
};

export default Auth;