/**
 * Binary search implementation for dictionary page lookup
 * Based on the original Mawrid Reader search algorithm
 */

import { DictionaryConfig } from '../dictionaries/types';
import { arabicNormalize } from '../transliteration';

export interface SearchResult {
  dictionary: string;
  page: number;
  word: string;
  exact: boolean;
}

/**
 * Perform binary search on a dictionary index
 * Returns the page number where the word should be found
 */
export function binarySearch(
  searchTerm: string,
  dictionary: DictionaryConfig
): SearchResult | null {
  const { index, startpage, id } = dictionary;
  
  // Normalize the search term for Arabic
  const normalizedSearch = arabicNormalize(searchTerm);
  
  // If index is empty or search term is empty, return null
  if (!index || index.length === 0 || !normalizedSearch) {
    return null;
  }

  let low = startpage;
  let high = index.length - 1;
  let lastValidPage = startpage;
  let exactMatch = false;

  // Binary search implementation
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midValue = index[mid];
    
    // Skip empty entries
    if (!midValue || midValue === '') {
      // Search around this position for a non-empty value
      let found = false;
      for (let offset = 1; offset < 10 && !found; offset++) {
        if (mid - offset >= 0 && index[mid - offset]) {
          high = mid - offset;
          found = true;
        } else if (mid + offset < index.length && index[mid + offset]) {
          low = mid + offset;
          found = true;
        }
      }
      if (!found) {
        break;
      }
      continue;
    }

    const normalizedMidValue = arabicNormalize(midValue);
    const comparison = normalizedSearch.localeCompare(normalizedMidValue, 'ar');

    if (comparison === 0) {
      // Exact match found
      exactMatch = true;
      lastValidPage = mid;
      break;
    } else if (comparison < 0) {
      high = mid - 1;
    } else {
      lastValidPage = mid;
      low = mid + 1;
    }
  }

  // Return the result
  return {
    dictionary: id,
    page: lastValidPage,
    word: index[lastValidPage] || '',
    exact: exactMatch
  };
}

/**
 * Search across multiple dictionaries
 */
export function searchDictionaries(
  searchTerm: string,
  dictionaries: DictionaryConfig[]
): SearchResult[] {
  const results: SearchResult[] = [];

  for (const dict of dictionaries) {
    const result = binarySearch(searchTerm, dict);
    if (result) {
      results.push(result);
    }
  }

  return results;
}

/**
 * Get suggestions for a partial search term
 * Returns nearby words from the index
 */
export function getSuggestions(
  searchTerm: string,
  dictionary: DictionaryConfig,
  maxSuggestions: number = 10
): string[] {
  const result = binarySearch(searchTerm, dictionary);
  if (!result) return [];

  const suggestions: string[] = [];
  const { index } = dictionary;
  const centerPage = result.page;
  
  // Collect words around the found position
  const radius = Math.ceil(maxSuggestions / 2);
  
  for (let offset = -radius; offset <= radius; offset++) {
    const pageNum = centerPage + offset;
    if (pageNum >= 0 && pageNum < index.length) {
      const word = index[pageNum];
      if (word && word !== '' && !suggestions.includes(word)) {
        suggestions.push(word);
      }
    }
  }

  // Sort suggestions by relevance (similarity to search term)
  const normalizedSearch = arabicNormalize(searchTerm);
  suggestions.sort((a, b) => {
    const aNorm = arabicNormalize(a);
    const bNorm = arabicNormalize(b);
    
    // Prioritize words that start with the search term
    const aStarts = aNorm.startsWith(normalizedSearch);
    const bStarts = bNorm.startsWith(normalizedSearch);
    
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    
    // Otherwise sort alphabetically
    return aNorm.localeCompare(bNorm, 'ar');
  });

  return suggestions.slice(0, maxSuggestions);
}