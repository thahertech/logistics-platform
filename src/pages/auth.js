import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../app/globals.css';
import Layout from '../app/Dashboard/Layout';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin
      ? process.env.NEXT_PUBLIC_LOGIN_ENDPOINT
      : process.env.NEXT_PUBLIC_REGISTER_ENDPOINT;

    try {
      const response = await axios.post(endpoint, {
        username: formData.usernameOrEmail,
        password: formData.password,
        email: isLogin ? undefined : formData.usernameOrEmail,
        name: isLogin ? undefined : formData.name,
      });

      if (isLogin) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', response.data.token);
        }
        router.push('/Profile');
      } else {
        console.log('Registered!', response.data);
        router.push('/Profile');
      }
    } catch (error) {
      // Remove all HTML tags to ensure only plain text is shown
      const plainTextError = error.response?.data?.message.replace(/<\/?[^>]+(>|$)/g, '') || 'Authentication failed';
      setError(plainTextError);
      console.error('Error during authentication', error.response?.data);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-screen bg-black-200">
        <div className="bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-lg border border-gray-300 flex flex-col p-6 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            {isLogin ? 'Kirjaudu' : 'Rekisteröinti'}
          </h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Käyttäjänimi"
                  value={formData.name}
                  onChange={handleChange}
                  className="text-black w-full p-2 mb-4 border rounded"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-white mb-2">{isLogin ? 'Käyttäjänimi tai sähköposti' : 'Sähköposti'}</label>
              <input
                type={isLogin ? 'text' : 'email'}
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                className="text-black border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Salasana</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="text-black border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>

            {/* Google Login Section */}
            <p className="galogin" style={{ cursor: 'pointer', background: 'none', boxShadow: 'none' }}>
              <a href="?error=ga_needs_configuring" style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Sign in with Google"
                  style={{ width: '3rem', height: '3rem', marginRight: '10px', marginBottom: '20px' }}
                />
                <span className="google-apps-header dark-pressed light">
                  <span className="inner">
                    <span className="icon dark-pressed light"></span>
                    <span style={{ marginLeft: '10px', color: 'white' }}>Kirjaudu Googlella</span>
                  </span>
                </span>
              </a>
            </p>

            <p className="forgetmenot text-white mb-5">
              <input name="rememberme" type="checkbox" id="rememberme" value="forever" />
              <label htmlFor="rememberme">Muista minut</label>
            </p>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              {isLogin ? 'Kirjaudu' : 'Rekisteröi'}
            </button>

          {/* Display error message and Forgot Password link */}
{error && (
  <div className="text-red-500 mt-4 text-center">
    <p>{error}</p> {/* Sanitize error message */}
    {isLogin && (
      <button
        className="text-blue-600 hover:underline mt-2"
        onClick={() => router.push('/forgot-password')}
      >
        Unohditko salasanan?
      </button>
    )}
  </div>
)}


            <p className="mt-4 text-left text-white">
              {isLogin ? 'Ei käyttäjää?' : 'Olet jo käyttäjä?'}
              <button
                type="button"
                className="text-blue-600 hover:underline ml-6"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? ' Rekisteröinti' : 'Kirjaudu'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
