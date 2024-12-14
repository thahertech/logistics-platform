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
    termsAccepted: false,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      termsAccepted: e.target.checked,
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    console.log("Form Data:", formData);
  
    try {
      let response;
      if (isLogin) {
        // Handle login
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        // if (error) throw error;
        response = data; // Assign response for unified handling
        console.log("Login Successful:", response.user);
      } else {
        // Handle sign-up
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });
        if (signUpError) throw signUpError;
  
        console.log("SignUp Successful:", signUpData);
  
        // Create a profile for the new user
        if (signUpData?.user?.id) {
          const userId = signUpData.user.id;
          const { error: profileError } = await supabase
            .from("profiles")
            .insert([{ user_id: userId, name: formData.name }]);
          if (profileError) throw profileError;
  
          console.log("Profile created for user ID:", userId);
        } else {
          throw new Error("User ID not found after sign-up");
        }
        response = signUpData; // Assign response for unified handling
      }
  
      // Check if user is present in the response
      if (response?.user) {
        router.push("/");
      } else {
        throw new Error("User not found in response");
      }
    } catch (error) {
      console.error("Error during registration/login:", error);
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
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
            <h2 className="text-2xl font-bold mb-6 text-center text-white">
              {isLogin ? 'Kirjaudu' : 'Luo Käyttäjä'}
            </h2>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Etunimi"
                    value={formData.name}
                    onChange={handleChange}
                    className={`text-black w-full p-2 mb-4 border rounded ${styles.inputField}`}
                    required
                  />
                </div>
              )}
              <div className={`mb-4`}>
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
              <div className="mb-4">
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
                
                  {/* Terms and Services Section */}
                  {!isLogin && (
                    <div className="mb-6">
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
                            href="/policy"
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
                <div className="text-red-500 mt-4 text-center">
                  <p>{error}</p>
                </div>
              )}
              <p className="mt-4 text-left text-white">
                {isLogin ? 'Ei käyttäjää?' : 'Oletko jo käyttäjä?'}
                <button
                  type="button"
                  className="text-blue-600 hover:underline ml-6"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? ' Luo käyttäjä' : 'Kirjaudu'}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
