/**
 * API route for dictionary information
 */

import { NextResponse } from 'next/server';
import { dictionaries } from '@/lib/dictionaries/config';

export async function GET() {
  try {
    // Return dictionary metadata without the full indexes
    const dictionaryInfo = Object.entries(dictionaries).map(([id, dict]) => ({
      id: dict.id,
      name: dict.name,
      color: dict.color,
      direction: dict.direction,
      columns: dict.columns,
      totalPages: dict.index.length,
      startPage: dict.startpage
    }));

    return NextResponse.json({
      dictionaries: dictionaryInfo,
      count: dictionaryInfo.length
    });
  } catch (error) {
    console.error('Dictionaries error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}