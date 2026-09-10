import jwt from 'jsonwebtoken';
import { GoogleTokenType, GoogleUserInfoType } from '../model/auth';

type JwtUserPayload = Pick<GoogleUserInfoType, 'id'>;

const getJwtSecret = () => {
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey || secretKey.length < 32) {
    throw new Error(
      'JWT_SECRET_KEY must be configured with at least 32 characters.',
    );
  }
  return secretKey;
};

export const getGoogleTokenByCode = async (
  code: string,
): Promise<GoogleTokenType | null> => {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
      redirect_uri: process.env.GOOGLE_REDIRECT_URI || '',
      grant_type: 'authorization_code',
    }),
  });

  if (!response.ok) return null;

  const data = (await response.json()) as GoogleTokenType;
  return data.access_token ? data : null;
};

export const getGoogleUserInfo = async (
  accessToken: string,
): Promise<GoogleUserInfoType> => {
  const userInfo = await fetch(
    'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!userInfo.ok) {
    throw new Error(`Google user info request failed with ${userInfo.status}.`);
  }

  return userInfo.json() as Promise<GoogleUserInfoType>;
};

export const generateJwtToken = (payload: Pick<GoogleUserInfoType, 'id'>) => {
  const token = jwt.sign(payload, getJwtSecret(), {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
  return token;
};

export const verifyJwtToken = (accessToken: string): JwtUserPayload | null => {
  const secretKey = getJwtSecret();

  try {
    const payload = jwt.verify(accessToken, secretKey, {
      algorithms: ['HS256'],
    });
    if (typeof payload === 'string' || typeof payload.id !== 'string')
      return null;
    return { id: payload.id };
  } catch {
    return null;
  }
};
