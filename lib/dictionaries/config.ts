import { DictionaryConfig, DictionaryGroup } from './types';
import { hw4Index } from './hw4-index';
import { llIndex } from './ll-index';
import { sgIndex } from './sg-index';

/**
 * Dictionary configurations for Arabic-English dictionaries
 * These are the primary dictionaries we're supporting in the modernized version
 */

export const dictionaries: DictionaryGroup = {
  hw4: {
    id: 'hw4',
    name: 'Hans Wehr 4th Edition',
    color: '#d70026',
    direction: 'rtl',
    columns: 1,
    offset: 15,
    startpage: 14,
    imagePrefix: 'hw4',
    index: hw4Index
  },
  ll: {
    id: 'll',
    name: "Lane's Lexicon",
    color: '#bbb',
    direction: 'rtl',
    columns: 2,
    offset: 15,
    startpage: 1,
    imagePrefix: 'll',
    index: llIndex,
    volumes: [1, 863, 1066, 1254, 1847, 2218, 2739, 2986],
    alpha: 'yes'
  },
  sg: {
    id: 'sg',
    name: 'Steingass',
    color: '#090',
    direction: 'ltr',
    columns: 2,
    offset: 6,
    startpage: 6,
    imagePrefix: 'sg',
    index: sgIndex
  }
};

// Export individual dictionaries for convenience
export const hw4 = dictionaries.hw4;
export const ll = dictionaries.ll;
export const sg = dictionaries.sg;

// Get dictionary by ID
export function getDictionary(id: string): DictionaryConfig | undefined {
  return dictionaries[id];
}

// Get all dictionary IDs
export function getDictionaryIds(): string[] {
  return Object.keys(dictionaries);
}

// Get image URL for a dictionary page
export function getImageUrl(dictId: string, page: number): string {
  const dict = getDictionary(dictId);
  if (!dict) {
    throw new Error(`Dictionary ${dictId} not found`);
  }

  // Check if we should use local images (for development)
  const useLocal = process.env.NEXT_PUBLIC_USE_LOCAL_IMAGES === 'true';
  
  if (useLocal) {
    // Local development path
    const pageStr = String(page).padStart(4, '0');
    const dir = Math.floor(page / 100);
    return `/images/${dict.imagePrefix}/${dir}/${dict.imagePrefix}-${pageStr}.png`;
  } else {
    // Production R2 URLs
    const bucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL || 'https://mawridreader.sylergy.net';
    const prefix = process.env.NEXT_PUBLIC_R2_PREFIX || 'mawridreader';
    const pageStr = String(page).padStart(4, '0');
    const dir = Math.floor(page / 100);
    return `${bucketUrl}/${prefix}/${dict.imagePrefix}/${dir}/${dict.imagePrefix}-${pageStr}.png`;
  }
}