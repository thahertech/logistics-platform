'use client';
import { useState , useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout/Layout';
import FormFields from '@/components/forms/AuthForm';
import styles from '@/app/Styles/login.module.css';
import AuthSectionAbstract from '@/components/animation/auth-section-abstract';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

import { handleSubmit } from '@/components/authentication/actions/handleSubmit';
import { handleForgotPassword } from '@/components/authentication/actions/handleForgotPassword';
import { signInWithGoogle, signInWithApple } from '@/components/authentication/actions/oAuth';


const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [useClient, setIsClient] = useState(false);
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!useClient) {
    return null;
  }

  return (
    <Layout>
      
      <div className={`${styles.authPageBackground} flex justify-center items-center`}>
        <div className="bg-black bg-opacity-70 mt-6 backdrop-filter backdrop-blur-lg border border-gray-300 flex p-6 rounded-lg shadow-md w-full max-w-4xl">         
          <div className="hidden md:flex flex-1 items-center justify-center">
            <AuthSectionAbstract />
          </div>
        <div className="flex flex-col flex-1 p-4">
          <p className=" flex-row text-center justify-around text-gray-300 mb-12 ">
              {isLogin ? (
                <span>Kirjaudu <button onClick={() => setIsLogin(false)} className="text-white rounded-[12px] ml-8 border py-2 px-4 ">Rekisteröidy </button></span>
              ) : (
                <span>Rekisteröidy<button onClick={() => setIsLogin(true)} className="text-white rounded-[12px] py-2 px-4 ml-8 border">Kirjaudu sisään</button></span>
              )}
            </p>
            {isLogin ? (
  <div className="flex flex-col items-center justify-evenly mt-10">

  <button
    type="button"
    onClick={() => signInWithGoogle(setIsLoading, setError, router)}
    className=" flex "
  >
      <Image
        src="public/assets/signin-assets/Web (mobile + desktop)/png@4x/dark/web_dark_sq_SI@4x.png"
        alt="Sign in with Google"
        width={250}
        height={40}
        className="cursor-pointer"
      />

  </button>
  <button 
    type="button"
    onClick={() => signInWithApple(setIsLoading, setError, router)}
    className=" flex justify-center items-center mt-2"
    >
  <Image 
  src="public/assets/signin-assets/Web (mobile + desktop)/Logo - SIWA - Logo-only - Black@3x.png"
  alt="sign in with apple"
  width={70}
  height={70}
  className="cursor-pointer"
/>
</button>
</div>

) : null}
            <form 
            
            onSubmit={(e) => handleSubmit(e, isLogin, formData, setError, setIsLoading, setFormData, setShowModal, setIsLogin, router, toast)}>
              <FormFields 
                isLogin={isLogin} 
                formData={formData} 
                setFormData={setFormData} 
                error={error}
                isLoading={isLoading} 
                setIsLoading={setIsLoading}
              />
            </form>
      

          <div className="text-center mt-12">
          <button
              type="button"
              onClick={() => {
                if (formData?.email) {
                  console.log(formData);
                  handleForgotPassword(formData, setError, setIsLoading);
                } else {
                  toast.error("Anna sähköposti ensin.");
                }
              }}
              className="text-gray-300 text-sm"
            >
              {isLogin && formData.email ? 'Unohditko salasanasi?' : ''}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  );
};

export default Auth;
