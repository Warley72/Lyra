import { createHmac, timingSafeEqual } from 'node:crypto';

import { env } from '../config/env.js';

type JwtPayload = {
  sub: number;
  exp: number;
};

function base64UrlEncode(value: string): string {
  return Buffer.from(value).toString('base64url');
}

function base64UrlDecode(value: string): string {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function sign(value: string): string {
  return createHmac('sha256', env.JWT_SECRET).update(value).digest('base64url');
}

function expiresInSeconds(value: string): number {
  const match = /^(\d+)([smhd])$/.exec(value);
  if (!match) throw new Error('JWT_EXPIRES_IN must use formats such as 15m or 7d.');

  const amount = Number(match[1]);
  const units: Record<string, number> = { s: 1, m: 60, h: 3_600, d: 86_400 };
  return amount * units[match[2]];
}

export function createToken(userId: number): string {
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = base64UrlEncode(JSON.stringify({
    sub: userId,
    exp: Math.floor(Date.now() / 1_000) + expiresInSeconds(env.JWT_EXPIRES_IN),
  }));
  const data = `${header}.${payload}`;

  return `${data}.${sign(data)}`;
}

export function verifyToken(token: string): JwtPayload | null {
  const [header, payload, signature] = token.split('.');
  if (!header || !payload || !signature) return null;

  const expectedSignature = sign(`${header}.${payload}`);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const decoded = JSON.parse(base64UrlDecode(payload)) as JwtPayload;
    if (!Number.isInteger(decoded.sub) || decoded.exp <= Math.floor(Date.now() / 1_000)) return null;
    return decoded;
  } catch {
    return null;
  }
}
