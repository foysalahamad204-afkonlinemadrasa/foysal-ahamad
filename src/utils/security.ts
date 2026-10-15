/**
 * Cryptographic utility for password hashing and authentication
 * Uses native Web Crypto API (SHA-256)
 */

export async function hashPassword(plainText: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Pre-computed SHA-256 for standard secure initial admin passphrase
// Matches standard secure admin password for academy initialization
export const DEFAULT_ADMIN_PASS_HASH = '1f107b7b1b3fb12948c2672ff655fcfd3db9f5a4073587b1c1e95cfc37e5f190';
