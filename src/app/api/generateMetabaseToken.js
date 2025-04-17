import jwt from "jsonwebtoken";

const METABASE_SITE_URL = "http://localhost:3000"; // Replace with your production URL if necessary
const METABASE_SECRET_KEY = "2ea53b9d6b4b139afcfd9e58046ca89bfc372701b340bc452a4f011ca3306674";

export default function handler(req, res) {
  const payload = {
    resource: { dashboard: 3 }, // Specify your dashboard ID
    params: {},
    exp: Math.round(Date.now() / 1000) + 10 * 60, // Expiry time (10 minutes)
  };

  const token = jwt.sign(payload, METABASE_SECRET_KEY);
  const iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#theme=night&background=false&bordered=true&titled=true`;

  res.status(200).json({ iframeUrl }); // Send the iframe URL to the frontend
}