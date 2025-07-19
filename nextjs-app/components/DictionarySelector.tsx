"use client";

import { useState } from "react";

interface Dictionary {
  id: string;
  name: string;
  language: string;
  color: string;
}

const mockDictionaries: Dictionary[] = [
  { id: "hw", name: "Hans Wehr", language: "English", color: "bg-red-100" },
  { id: "ll", name: "Lane's Lexicon", language: "English", color: "bg-blue-100" },
  { id: "sg", name: "Steingass", language: "English", color: "bg-green-100" },
  { id: "la", name: "Lisan al-Arab", language: "Arabic", color: "bg-yellow-100" },
];

export default function DictionarySelector() {
  const [selectedDicts, setSelectedDicts] = useState<string[]>(["hw", "ll"]);

  const toggleDictionary = (id: string) => {
    setSelectedDicts(prev =>
      prev.includes(id)
        ? prev.filter(d => d !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="text-lg font-semibold mb-3">Select Dictionaries</h3>
      <div className="space-y-2">
        {mockDictionaries.map(dict => (
          <label
            key={dict.id}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
              selectedDicts.includes(dict.id)
                ? dict.color
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <input
              type="checkbox"
              checked={selectedDicts.includes(dict.id)}
              onChange={() => toggleDictionary(dict.id)}
              className="mr-3"
            />
            <div>
              <div className="font-medium">{dict.name}</div>
              <div className="text-sm text-gray-600">{dict.language}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}