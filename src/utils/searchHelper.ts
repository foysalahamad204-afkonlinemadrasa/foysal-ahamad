/**
 * Utility functions for robust Application ID and Phone search
 * Supports Bengali numerals (০-৯), formatting differences, and case-insensitivity.
 */

// Mapping of Bengali digits to English digits
const BENGALI_DIGITS_MAP: Record<string, string> = {
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
};

/**
 * Converts Bengali digits in a string to standard ASCII digits (0-9)
 */
export function convertBengaliToEnglishDigits(str: string): string {
  if (!str) return '';
  return str.replace(/[০-৯]/g, (char) => BENGALI_DIGITS_MAP[char] || char);
}

/**
 * Normalizes an application ID for searching
 * - Converts Bengali numerals (০-৯) to 0-9
 * - Trims whitespace
 * - Converts to uppercase
 * - Normalizes hyphens and spaces
 */
export function normalizeApplicationId(id: string): string {
  if (!id) return '';
  const converted = convertBengaliToEnglishDigits(id.trim());
  return converted
    .toUpperCase()
    .replace(/\s*-\s*/g, '-')
    .replace(/\s+/g, ' ');
}

/**
 * Returns a purely alphanumeric uppercase string for flexible comparison
 * e.g. "FSDQ-2026-2161" -> "FSDQ20262161"
 */
export function stripToAlphanumeric(str: string): string {
  if (!str) return '';
  return convertBengaliToEnglishDigits(str)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
}

/**
 * Normalizes phone numbers (handles Bengali digits, strips +, spaces, dashes)
 */
export function normalizePhone(phone: string): string {
  if (!phone) return '';
  return convertBengaliToEnglishDigits(phone).replace(/[^0-9]/g, '');
}

/**
 * Checks if a search query matches an admission application
 */
export function isAdmissionMatch(app: { id: string; phone?: string; [key: string]: any }, rawQuery: string): boolean {
  if (!rawQuery || !app) return false;

  const normalizedQuery = normalizeApplicationId(rawQuery);
  const alphaQuery = stripToAlphanumeric(rawQuery);
  const phoneQuery = normalizePhone(rawQuery);

  // 1. Direct ID match
  const appId = (app.id || app.applicationId || app.admissionId || '').toString();
  const normalizedAppId = normalizeApplicationId(appId);
  if (normalizedAppId === normalizedQuery) {
    return true;
  }

  // 2. Alphanumeric stripped ID match (handles missing or misplaced hyphens)
  const alphaAppId = stripToAlphanumeric(appId);
  if (alphaAppId && alphaQuery && alphaAppId === alphaQuery) {
    return true;
  }

  // 3. Trailing number match (e.g. searching "2161" matches "FSDQ-2026-2161")
  if (alphaQuery && alphaQuery.length >= 4 && alphaAppId.endsWith(alphaQuery)) {
    return true;
  }

  // 4. Phone match (if user entered phone number)
  if (phoneQuery && phoneQuery.length >= 7 && app.phone) {
    const normalizedAppPhone = normalizePhone(app.phone);
    if (normalizedAppPhone.includes(phoneQuery)) {
      return true;
    }
  }

  return false;
}
