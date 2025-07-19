/**
 * API route for dictionary page navigation
 */

import { NextRequest, NextResponse } from 'next/server';
import { dictionaries } from '@/lib/dictionaries/config';
import { getImageUrl } from '@/lib/dictionaries/config';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dictionaryId = searchParams.get('dict');
    const pageStr = searchParams.get('page');

    if (!dictionaryId) {
      return NextResponse.json(
        { error: 'Dictionary ID parameter "dict" is required' },
        { status: 400 }
      );
    }

    if (!pageStr) {
      return NextResponse.json(
        { error: 'Page parameter "page" is required' },
        { status: 400 }
      );
    }

    const page = parseInt(pageStr, 10);
    if (isNaN(page)) {
      return NextResponse.json(
        { error: 'Page parameter must be a valid number' },
        { status: 400 }
      );
    }

    const dictionary = dictionaries[dictionaryId];
    if (!dictionary) {
      return NextResponse.json(
        { error: `Dictionary "${dictionaryId}" not found` },
        { status: 404 }
      );
    }

    // Check if page is within valid range
    if (page < dictionary.startpage || page > dictionary.startpage + dictionary.index.length - 1) {
      return NextResponse.json(
        { error: `Page ${page} is out of range for dictionary "${dictionaryId}"` },
        { status: 400 }
      );
    }

    // Get the page data
    const imageUrl = getImageUrl(dictionaryId, page);
    
    // Calculate previous and next page URLs
    const prevPage = page > dictionary.startpage 
      ? {
          page: page - 1,
          url: getImageUrl(dictionaryId, page - 1)
        }
      : null;
    
    const nextPage = page < dictionary.startpage + dictionary.index.length - 1
      ? {
          page: page + 1,
          url: getImageUrl(dictionaryId, page + 1)
        }
      : null;

    return NextResponse.json({
      dictionary: dictionaryId,
      dictionaryName: dictionary.name,
      page,
      imageUrl,
      prevPage,
      nextPage
    });
  } catch (error) {
    console.error('Page navigation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}