/**
 * API route for dictionary search
 */

import { NextRequest, NextResponse } from 'next/server';
import { searchDictionaries } from '@/lib/search/binary-search';
import { dictionaries } from '@/lib/dictionaries/config';
import { getImageUrl } from '@/lib/dictionaries/config';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const dictionaryIds = searchParams.get('dicts')?.split(',') || [];

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required' },
        { status: 400 }
      );
    }

    // Get selected dictionaries or use all if none specified
    const selectedDicts = dictionaryIds.length > 0
      ? dictionaryIds
          .map(id => dictionaries[id])
          .filter(Boolean)
      : Object.values(dictionaries);

    if (selectedDicts.length === 0) {
      return NextResponse.json(
        { error: 'No valid dictionaries specified' },
        { status: 400 }
      );
    }

    // Perform search
    const results = searchDictionaries(query, selectedDicts);

    // Enhance results with image URLs
    const enhancedResults = results.map(result => ({
      ...result,
      dictionaryName: dictionaries[result.dictionary].name,
      imageUrl: getImageUrl(result.dictionary, result.page),
      // Get adjacent pages for navigation
      prevPage: result.page > dictionaries[result.dictionary].startpage 
        ? {
            page: result.page - 1,
            url: getImageUrl(result.dictionary, result.page - 1)
          }
        : null,
      nextPage: result.page < dictionaries[result.dictionary].index.length - 1
        ? {
            page: result.page + 1,
            url: getImageUrl(result.dictionary, result.page + 1)
          }
        : null
    }));

    return NextResponse.json({
      query,
      results: enhancedResults,
      count: enhancedResults.length
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}