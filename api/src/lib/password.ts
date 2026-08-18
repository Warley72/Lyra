import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;

export function isPasswordHash(value: string): boolean {
  const [salt, key, ...remaining] = value.split(':');
  return remaining.length === 0
    && /^[a-f0-9]{32}$/i.test(salt ?? '')
    && /^[a-f0-9]{128}$/i.test(key ?? '');
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;

  return `${salt}:${derivedKey.toString('hex')}`;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  if (!isPasswordHash(hash)) return false;

  const [salt, storedKey] = hash.split(':');

  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;
  const storedKeyBuffer = Buffer.from(storedKey, 'hex');

  return storedKeyBuffer.length === derivedKey.length
    && timingSafeEqual(storedKeyBuffer, derivedKey);
}

export function verifyLegacyPassword(password: string, storedPassword: string): boolean {
  const passwordBuffer = Buffer.from(password, 'utf8');
  const storedPasswordBuffer = Buffer.from(storedPassword, 'utf8');

  return passwordBuffer.length === storedPasswordBuffer.length
    && timingSafeEqual(passwordBuffer, storedPasswordBuffer);
}
