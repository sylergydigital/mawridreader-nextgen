/**
 * Arabic text utilities for normalization and comparison
 */

/**
 * Normalize Arabic text for searching
 * Removes diacritics and normalizes various Arabic letter forms
 */
export function arabicNormalize(text: string): string {
  if (!text) return '';

  return text
    // Remove Arabic diacritics
    .replace(/[\u064B-\u065F]/g, '') // Fathatan to Sukun
    .replace(/[\u0670]/g, '') // Superscript Alef
    .replace(/[\u06D6-\u06DC]/g, '') // Small high ligatures
    .replace(/[\u06DF-\u06E8]/g, '') // Small high letters
    .replace(/[\u06EA-\u06ED]/g, '') // Empty centre letters
    
    // Normalize Alef variations
    .replace(/[\u0622\u0623\u0625\u0627]/g, '\u0627') // All Alef forms to bare Alef
    
    // Normalize Hamza
    .replace(/[\u0621\u0654\u0655]/g, '') // Remove standalone Hamza
    
    // Normalize Waw
    .replace(/\u0624/g, '\u0648') // Waw with Hamza above to Waw
    
    // Normalize Yeh
    .replace(/[\u0626\u0649]/g, '\u064A') // Yeh with Hamza and Alef Maksura to Yeh
    
    // Normalize Teh Marbuta
    .replace(/\u0629/g, '\u0647') // Teh Marbuta to Heh
    
    // Remove Tatweel
    .replace(/\u0640/g, '')
    
    // Trim whitespace
    .trim();
}

/**
 * Compare two Arabic strings for sorting
 */
export function arabicCompare(a: string, b: string): number {
  const aNorm = arabicNormalize(a);
  const bNorm = arabicNormalize(b);
  return aNorm.localeCompare(bNorm, 'ar');
}

/**
 * Check if a string contains Arabic characters
 */
export function hasArabic(text: string): boolean {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
}

/**
 * Get the root form of an Arabic word (basic implementation)
 * This is a simplified version - full root extraction would require morphological analysis
 */
export function getArabicRoot(word: string): string {
  const normalized = arabicNormalize(word);
  
  // Remove common prefixes
  let root = normalized
    .replace(/^ال/, '') // Remove definite article
    .replace(/^[وف]/, '') // Remove wa- and fa- prefixes
    .replace(/^[بلك]/, '') // Remove bi-, li-, ka- prefixes
    
  // Remove common suffixes
  root = root
    .replace(/ات$/, '') // Remove -at plural
    .replace(/ان$/, '') // Remove -an dual
    .replace(/ين$/, '') // Remove -in plural
    .replace(/ون$/, '') // Remove -un plural
    .replace(/ية$/, '') // Remove -iyya
    .replace(/ها$/, '') // Remove -ha possessive
    
  return root;
}