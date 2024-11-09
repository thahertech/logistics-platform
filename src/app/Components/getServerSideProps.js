import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export async function getServerSideProps(context) {
  const jwtToken = context.req.cookies.token; // Access the token from cookies

  if (!jwtToken) {
    return {
      redirect: {
        destination: '/login', // Redirect to login if no token
        permanent: false,
      },
    };
  }

  let userId;
  try {
    const decoded = jwtDecode(jwtToken);
    userId = decoded.data.user.id; // Extract user ID from decoded token
  } catch (error) {
    return {
      notFound: true, // Handle invalid token
    };
  }

  try {
    // Fetch user details, including ACF fields
    const response = await axios.get(`http://truckup.local/wp-json/wp/v2/users/${userId}?_fields=name,email,acf`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const userData = response.data;

    return {
      props: {
        companyName: userData.name || '',
        email: userData.email || '',
        yTunnus: userData.acf['y-tunnus'] || '',
        email: userData.acf['email'] || '',
        nettisivut: userData.acf['nettisivut'] || '',
        yhteyshenkilö: userData.acf['contact_person'] || '',
        tiliNumero: userData.acf['bank_number'] || '',
        PuhelinNumero: userData.acf['phone_number'] || '',
        nettiSivut: userData.acf['nettisivut'] || '',

      },
    };
  } catch (error) {
    console.error('Error fetching user details:', error);
    return {
      notFound: true,
    };
  }
}
