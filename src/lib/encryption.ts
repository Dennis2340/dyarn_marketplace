// lib/encryption-utils.ts
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = process.env.ENCRYPTION_KEY as string; // 32 bytes for AES-256
const ivLength = 16; // AES block size in bytes

function generateIv(): Buffer {
  return crypto.randomBytes(ivLength);
}

export function encrypt(text: string): string {
  const iv = generateIv();
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(text: string): string {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift() as string, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
