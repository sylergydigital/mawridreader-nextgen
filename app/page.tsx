"use client";

import { useState, useRef, useEffect } from "react";
import SearchBox from "@/components/SearchBox";
import DictionarySelector from "@/components/DictionarySelector";
import { SearchResults } from "@/components/SearchResults";

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

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDictionaries, setSelectedDictionaries] = useState<string[]>(['hw4', 'll', 'sg']);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Ref for auto-scrolling to search results
  const searchResultsRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to search results when they load
  useEffect(() => {
    if (searchResults.length > 0 && searchResultsRef.current) {
      searchResultsRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [searchResults]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    
    try {
      // Build the API URL with selected dictionaries
      const params = new URLSearchParams({
        q: query,
        dicts: selectedDictionaries.join(',')
      });
      
      const response = await fetch(`/api/search?${params}`);
      const data = await response.json();
      
      if (response.ok) {
        setSearchResults(data.results);
      } else {
        console.error('Search error:', data.error);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Mawrid Reader
          </h1>
          <p className="text-lg text-text-secondary">
            Modern Arabic Dictionary Interface
          </p>
          <div className="mt-4 text-sm text-status-warning bg-status-warning-bg inline-block px-4 py-2 rounded-lg">
            🚧 Next.js Migration in Progress 🚧
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-6">Search</h2>
            <SearchBox onSearch={handleSearch} />
          </div>
          
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-6">Dictionaries</h2>
            <DictionarySelector 
              selectedDictionaries={selectedDictionaries}
              onChange={setSelectedDictionaries}
            />
          </div>
        </div>

        {searchQuery && (
          <div ref={searchResultsRef} className="mt-8">
            {isSearching ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-3 text-text-secondary">Searching...</span>
              </div>
            ) : (
              <SearchResults results={searchResults} query={searchQuery} />
            )}
          </div>
        )}
      </div>
    </main>
  );
}