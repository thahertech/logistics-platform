// you will need to install via 'npm install jsonwebtoken' or in your package.json

const jwt = require("jsonwebtoken");

const METABASE_SITE_URL = "http://localhost:3000";
const METABASE_SECRET_KEY = "2ea53b9d6b4b139afcfd9e58046ca89bfc372701b340bc452a4f011ca3306674";

const payload = {
  resource: { dashboard: 3 },
  params: {},
  exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
};
const token = jwt.sign(payload, METABASE_SECRET_KEY);

const iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token +
  "#bordered=true&titled=true";