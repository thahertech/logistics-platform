export const setSessionCookie = async (access_token) => {
    const response = await fetch('/api/set-cookie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ access_token }),
    });
  
    const data = await response.json();
    console.log(data.message);
  };