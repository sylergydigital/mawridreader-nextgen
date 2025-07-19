/**
 * API route for search suggestions
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSuggestions } from '@/lib/search/binary-search';
import { dictionaries } from '@/lib/dictionaries/config';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const dictId = searchParams.get('dict') || 'hw4'; // Default to Hans Wehr
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required' },
        { status: 400 }
      );
    }

    const dictionary = dictionaries[dictId];
    if (!dictionary) {
      return NextResponse.json(
        { error: `Dictionary "${dictId}" not found` },
        { status: 400 }
      );
    }

    // Get suggestions
    const suggestions = getSuggestions(query, dictionary, limit);

    return NextResponse.json({
      query,
      dictionary: dictId,
      suggestions,
      count: suggestions.length
    });
  } catch (error) {
    console.error('Suggestions error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}