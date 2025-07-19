/**
 * Transliteration utilities for converting Latin characters to Arabic
 * Based on the original Mawrid Reader implementation
 */

// Buckwalter-style transliteration mappings
const buckwalterMap: Record<string, string> = {
  // Two-letter combinations
  'v': 'ث', 'V': 'ث',
  'g': 'غ', 'G': 'غ',
  'x': 'خ', 'X': 'خ',
  '$': 'ش',
  '*': 'ذ',
  
  // Case-sensitive mappings
  'd': 'د', 'D': 'ض',
  'z': 'ز', 'Z': 'ظ',
  's': 'س', 'S': 'ص',
  't': 'ت', 'T': 'ط',
  'h': 'ه', 'H': 'ح',
  
  // Other letters
  'a': 'ا', 'A': 'ا',
  'b': 'ب', 'B': 'ب',
  'j': 'ج', 'J': 'ج',
  'r': 'ر', 'R': 'ر',
  'f': 'ف', 'F': 'ف',
  'q': 'ق', 'Q': 'ق',
  'k': 'ك', 'K': 'ك',
  'l': 'ل', 'L': 'ل',
  'm': 'م', 'M': 'م',
  'n': 'ن', 'N': 'ن',
  'w': 'و', 'W': 'و',
  'y': 'ي', 'Y': 'ي',
  'e': 'ع', 'E': 'ع',
  
  // Numbers (Arabic chat alphabet)
  '3': 'ع',
  '7': 'ح',
};

// Multi-character replacements
const multiCharMap: Record<string, string> = {
  'th': 'ث',
  'gh': 'غ',
  'kh': 'خ',
  'sh': 'ش',
  'dh': 'ذ',
};

export function transliterate(input: string): string {
  let result = input;
  
  // Apply multi-character replacements first
  Object.entries(multiCharMap).forEach(([latin, arabic]) => {
    result = result.replace(new RegExp(latin, 'g'), arabic);
  });
  
  // Apply single character replacements
  Object.entries(buckwalterMap).forEach(([latin, arabic]) => {
    result = result.replace(new RegExp(`\\${latin}`, 'g'), arabic);
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