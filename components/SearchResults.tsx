'use client';

import { useState } from 'react';
import { PageViewer } from './PageViewer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface SearchResult {
  dictionary: string;
  dictionaryName: string;
  page: number;
  word: string;
  exact: boolean;
  imageUrl: string;
  prevPage?: { page: number; url: string } | null;
  nextPage?: { page: number; url: string } | null;
}

interface PageData {
  dictionary: string;
  dictionaryName: string;
  page: number;
  imageUrl: string;
  prevPage?: { page: number; url: string } | null;
  nextPage?: { page: number; url: string } | null;
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
}

export function SearchResults({ results, query }: SearchResultsProps) {
  const [selectedTab, setSelectedTab] = useState(results[0]?.dictionary || '');
  const [pageData, setPageData] = useState<Record<string, PageData>>({});

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No results found for "{query}"</p>
      </div>
    );
  }

  // Group results by dictionary
  const resultsByDict = results.reduce((acc, result) => {
    if (!acc[result.dictionary]) {
      acc[result.dictionary] = result;
    }
    return acc;
  }, {} as Record<string, SearchResult>);

  // Handle page navigation
  const handlePageChange = async (dictionaryId: string, newPage: number) => {
    try {
      const response = await fetch(`/api/page?dict=${dictionaryId}&page=${newPage}`);
      const data = await response.json();
      
      if (response.ok) {
        setPageData(prev => ({
          ...prev,
          [dictionaryId]: data
        }));
      } else {
        console.error('Page navigation error:', data.error);
      }
    } catch (error) {
      console.error('Page navigation error:', error);
    }
  };

  // Get current page data for a dictionary (either from pageData state or original result)
  const getCurrentPageData = (dictionaryId: string): PageData => {
    return pageData[dictionaryId] || resultsByDict[dictionaryId];
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Search Results for "{query}"
        </h2>
        <Badge variant="secondary">
          {results.length} {results.length === 1 ? 'result' : 'results'}
        </Badge>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${results.length}, 1fr)` }}>
          {results.map((result) => (
            <TabsTrigger
              key={result.dictionary}
              value={result.dictionary}
              className="flex items-center gap-2"
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getDictionaryColor(result.dictionary) }}
              />
              {result.dictionaryName}
              {result.exact && <Badge variant="outline" className="ml-1 text-xs">Exact</Badge>}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(resultsByDict).map(([dictId, originalResult]) => {
          const currentData = getCurrentPageData(dictId);
          return (
            <TabsContent
              key={dictId}
              value={dictId}
              className="mt-4 h-[800px]"
            >
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  {pageData[dictId] ? (
                    `Viewing page ${currentData.page}`
                  ) : (
                    `Found on page ${originalResult.page} - "${originalResult.word}"`
                  )}
                </p>
              </div>
              
              <PageViewer
                imageUrl={currentData.imageUrl}
                dictionaryName={currentData.dictionaryName}
                page={currentData.page}
                prevPageUrl={currentData.prevPage?.url}
                nextPageUrl={currentData.nextPage?.url}
                onPageChange={(newPage) => handlePageChange(dictId, newPage)}
                className="h-full"
              />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}

// Helper function to get dictionary colors
function getDictionaryColor(dictId: string): string {
  const colors: Record<string, string> = {
    hw4: '#d70026',
    ll: '#bbb',
    sg: '#090'
  };
  return colors[dictId] || '#666';
}