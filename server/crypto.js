const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;

function getKey() {
  const raw = process.env.ENCRYPTION_KEY;
  if (!raw || raw === 'replace-this-with-a-long-random-string') {
    throw new Error(
      'ENCRYPTION_KEY is not set (or still the placeholder). Set a real value in .env before storing connections. ' +
      'Generate one with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"'
    );
  }
  // Derive a fixed-length key from whatever string the operator provided.
  return crypto.createHash('sha256').update(raw).digest();
}

function encrypt(plainText) {
  if (plainText === null || plainText === undefined || plainText === '') return '';
  const key = getKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(String(plainText), 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  // Store iv + authTag + ciphertext together, base64-encoded.
  return Buffer.concat([iv, authTag, encrypted]).toString('base64');
}

function decrypt(payload) {
  if (!payload) return '';
  const key = getKey();
  const buf = Buffer.from(payload, 'base64');
  const iv = buf.subarray(0, IV_LENGTH);
  const authTag = buf.subarray(IV_LENGTH, IV_LENGTH + 16);
  const encrypted = buf.subarray(IV_LENGTH + 16);
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString('utf8');
}

module.exports = { encrypt, decrypt };
