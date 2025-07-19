"use client";

import { useState } from "react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Arabic root (e.g., كتب or ktb)"
          className="flex-1 px-4 py-2 bg-surface border border-border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-interactive-primary text-text-primary placeholder:text-text-muted"
          dir="auto"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-interactive-primary text-white rounded-lg hover:bg-interactive-primary-hover transition-colors"
        >
          Search
        </button>
      </div>
      <p className="text-sm text-text-muted mt-2">
        You can type in Arabic or use transliteration (th→ث, kh→خ, sh→ش)
      </p>
    </form>
  );
}