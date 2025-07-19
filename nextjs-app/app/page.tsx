"use client";

import { useState } from "react";
import SearchBox from "@/components/SearchBox";
import DictionarySelector from "@/components/DictionarySelector";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
    // TODO: Implement actual search functionality
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Mawrid Reader
          </h1>
          <p className="text-lg text-gray-600">
            Modern Arabic Dictionary Interface
          </p>
          <div className="mt-4 text-sm text-orange-600 bg-orange-50 inline-block px-4 py-2 rounded-lg">
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
            <DictionarySelector />
          </div>
        </div>

        {searchQuery && (
          <div className="mt-8 p-6 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Search Results</h3>
            <p className="text-gray-600">
              Searching for: <span className="font-mono font-bold">{searchQuery}</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              (Search functionality will be implemented soon)
            </p>
          </div>
        )}
      </div>
    </main>
  );
}