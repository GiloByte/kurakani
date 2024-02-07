import { OAuth2Client } from 'google-auth-library';

// TODO: enter client ID
const CLIENT_ID = '';
const client = new OAuth2Client(CLIENT_ID);

export async function googleVerify(token: string) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });

  const payload = ticket.getPayload();

  return {
    name: payload.name,
    picture: payload.picture,
    email: payload.email,
  };
}
