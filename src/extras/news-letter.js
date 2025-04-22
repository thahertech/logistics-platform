// import sgMail from '@sendgrid/mail';

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { company, email, message } = req.body;

//     // Log the incoming request body
//     console.log('Request body:', req.body);

//     // Check for required fields
//     if (!email || !company) {
//       return res.status(400).json({ error: 'Sähköposti ja yrityksen nimi ovat pakollisia.' });
//     }

//     const msg = {
//       to: 'info@logistix.fi',
//       from: 'info@logistix.fi', // Ensure this email is verified in SendGrid
//       subject: `Uusi ilmoittautuminen: ${email}`,
//       text: `Saatu uusi ilmoittautuminen: ${email}\n\nYritys: ${company}\n\nViesti: ${message || 'Ei viestiä'}`,
//       html: `<p>Saatu uusi ilmoittautuminen: <strong>${email}</strong></p>
//              <p><strong>Yritys:</strong> ${company || 'Ei tietoa'}</p>
//              <p><strong>Viesti:</strong> ${message || 'Ei viestiä'}</p>`,
//     };

//     try {
//       await sgMail.send(msg);
//       console.log('Sähköposti lähetetty onnistuneesti');
//       return res.status(200).json({ message: 'Viestisi on lähetetty onnistuneesti!' });
//     } catch (error) {
//       console.error('Virhe sähköpostin lähettämisessä:', error.response ? error.response.body : error.message);
//       return res.status(500).json({ error: 'Viestin lähettäminen epäonnistui. Yritä uudelleen.' });
//     }
//   } else {
//     console.log(`Invalid HTTP method: ${req.method}`);
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Metodi ${req.method} ei ole sallittu`);
//   }
// }
