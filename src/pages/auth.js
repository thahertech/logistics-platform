import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../app/globals.css';
import Layout from '../app/dashboard/Layout';

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
      : process.env.NEXT_PUBLIC_REGISTER_ENDPOINT; // Custom registration endpoint

    try {
      const response = await axios.post(endpoint, {
        username: formData.usernameOrEmail,
        password: formData.password,
        email: formData.usernameOrEmail,
        name: formData.name,
      });

      if (isLogin) {
        // Store the JWT token
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', response.data.token);
        }
        // Redirect to profile
        router.push('/Profile');
      } else {
        console.log('Registered!', response.data);
        // Optionally redirect after registration
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Authentication failed');
      console.error('Error during authentication', error.response?.data);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-screen bg-black-200">
        <div className="bg-gray-100 bg-opacity-50 backdrop-filter backdrop-blur-lg border border-gray-300 flex flex-col p-6 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            {isLogin ? 'Login' : 'Register'}
          </h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="text-black w-full p-2 mb-4 border rounded"
                    required
                  />
                </div>
              </>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">{isLogin ? 'Username or Email' : 'Email'}</label>
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
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="text-black border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            <p className="mt-4 text-left text-white">
              {isLogin ? 'No account? ' : 'Already have an account?'}
              <button
                type="button"
                className="text-blue-600 hover:underline ml-6"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? ' Register' : 'Login'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
