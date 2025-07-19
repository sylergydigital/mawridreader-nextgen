/**
 * Transliteration utilities for converting Latin characters to Arabic
 * Based on the original Mawrid Reader implementation
 */

// Multi-character replacements (must be done first!)
const multiCharMap: Record<string, string> = {
  'th': 'ث',
  'gh': 'غ',
  'kh': 'خ',
  'sh': 'ش',
  'dh': 'ذ',
};

// Buckwalter-style transliteration mappings
const buckwalterMap: Record<string, string> = {
  // Special characters
  '$': 'ش',
  '*': 'ذ',
  
  // Case-sensitive mappings
  'd': 'د', 'D': 'ض',
  'z': 'ز', 'Z': 'ظ',
  's': 'س', 'S': 'ص',
  't': 'ت', 'T': 'ط',
  'h': 'ه', 'H': 'ح',
  
  // Case-insensitive (but we include both cases)
  'v': 'ث', 'V': 'ث',
  'g': 'غ', 'G': 'غ',
  'x': 'خ', 'X': 'خ',
  'a': 'ا', 'A': 'ا',
  'b': 'ب', 'B': 'ب',
  'j': 'ج', 'J': 'ج',
  'r': 'ر', 'R': 'ر',
  'e': 'ع', 'E': 'ع',
  'f': 'ف', 'F': 'ف',
  'q': 'ق', 'Q': 'ق',
  'k': 'ك', 'K': 'ك',
  'l': 'ل', 'L': 'ل',
  'm': 'م', 'M': 'م',
  'n': 'ن', 'N': 'ن',
  'w': 'و', 'W': 'و',
  'y': 'ي', 'Y': 'ي',
  
  // Numbers (Arabic chat alphabet)
  '3': 'ع',
  '7': 'ح',
};

export function transliterate(input: string): string {
  let result = input;
  
  // Apply multi-character replacements first
  Object.entries(multiCharMap).forEach(([latin, arabic]) => {
    result = result.replace(new RegExp(latin, 'g'), arabic);
  });
  
  // Apply single character replacements
  Object.entries(buckwalterMap).forEach(([latin, arabic]) => {
    // Only escape special regex characters
    const escaped = latin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(new RegExp(escaped, 'g'), arabic);
  });
  
  // Normalize Arabic (all forms of alif to plain alif)
  result = result.replace(/[أإآٱ]/g, 'ا');
  
  return result;
}

export function normalizeArabic(input: string): string {
  return input
    .replace(/[أإآٱ]/g, 'ا')  // Normalize alif variants
    .replace(/[ىئ]/g, 'ي')    // Normalize yaa variants
    .replace(/ة/g, 'ه');      // Normalize taa marbuuta
}

// Import and re-export Arabic utilities
export { arabicNormalize, arabicCompare, hasArabic, getArabicRoot } from './transliteration/arabic-utils';

// Additional transliteration functions
export function buckwalterToArabic(input: string): string {
  return transliterate(input);
}

export function arabicToBuckwalter(input: string): string {
  // Reverse mapping - simplified version
  let result = input;
  Object.entries(buckwalterMap).forEach(([latin, arabic]) => {
    result = result.replace(new RegExp(arabic, 'g'), latin);
  });
  return result;
}