/** @type {import('tailwindcss').Config} */
module.exports = {
   webpackDevMiddleware: config => {
    config.headers = {
      ...config.headers,
      'Access-Control-Allow-Origin': '*',
    };
    return config;
  },
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/app/Dashboard/**/*.{js,ts,jsx,tsx}",
    "./src/app/Components/**/*.{js,ts,jsx,tsx}",
   "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}",


  ],
 theme: {
    extend: {
      screens: {
        'custom': '880px', // Custom breakpoint at 880px
      },
      colors: {
        primary: '#003366',
      },
    },
  },
  plugins: [],
};

