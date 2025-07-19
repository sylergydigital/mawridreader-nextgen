/**
 * Dictionary configuration types
 */

export interface DictionaryConfig {
  id: string;
  name: string;
  color: string;
  direction: 'ltr' | 'rtl';
  columns: number;
  offset: number;
  startpage: number;
  imagePrefix: string;
  index: string[];
  volumes?: number[];
  newChapterForLetter?: boolean;
  alpha?: 'yes' | 'no';
}

export interface DictionaryGroup {
  [key: string]: DictionaryConfig;
}

export interface SearchResult {
  dictionary: string;
  page: number;
  suggestions?: string[];
}

export interface ImageInfo {
  url: string;
  page: number;
  dictionary: string;
}