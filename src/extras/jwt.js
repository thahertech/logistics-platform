import { sign } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { join } from 'path';

const privateKey = readFileSync(join(__dirname, '../lib/AuthKey_2CPYHL433V.p8'));

const teamId = '3VUTDS9PXX';
const keyId = '2CPYHL433V';
const clientId = 'com.logistix.apple';

const payload = {
  iss: teamId, // Issuer: Your Team ID
  iat: Math.floor(Date.now() / 1000), // Issued at: Current timestamp
  exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expiration: 1 hour from now
  aud: 'https://appleid.apple.com', // Audience: Apple ID URL
  sub: clientId, // Subject: Your Client ID
};

const header = {
  alg: 'ES256', // Algorithm
  kid: keyId,   // Key ID
};

const token = sign(payload, privateKey, { algorithm: 'ES256', header });

console.log('Generated JWT:', token);