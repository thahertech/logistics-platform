import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { company, email, message } = req.body;

    // Check for required fields
    if (!email || !company) {
      return res.status(400).json({ error: 'Sähköposti ja yritys vaaditaan.' });
    }

    const msg = {
      to: 'info@logistix.fi',
      from: 'info@logistix.fi',
      subject: `New Pre Sign-up Form Submission from ${email}`,
      text: `You have received a new submission from ${email}\n\nCompany: ${company}\n\nMessage: ${message || 'N/A'}`,
      html: `<p>You have received a new submission from <strong>${email}</strong></p>
             <p><strong>Company:</strong> ${company || 'N/A'}</p>
             <p><strong>Message:</strong> ${message || 'N/A'}</p>`,
    };

    try {
      await sgMail.send(msg);
      console.log('Email sent successfully');
      return res.status(200).json({ message: 'Your message has been sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send your message. Please try again.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
