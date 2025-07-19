"use client";

import { useEffect, useState } from "react";

interface Dictionary {
  id: string;
  name: string;
  language: string;
  color: string;
}

const dictionaries: Dictionary[] = [
  { id: "hw4", name: "Hans Wehr 4th Edition", language: "Arabic-English", color: "bg-red-100" },
  { id: "ll", name: "Lane's Lexicon", language: "Arabic-English", color: "bg-gray-100" },
  { id: "sg", name: "Steingass", language: "Persian-English", color: "bg-green-100" },
];

interface DictionarySelectorProps {
  selectedDictionaries?: string[];
  onChange?: (selected: string[]) => void;
}

export default function DictionarySelector({ 
  selectedDictionaries = ["hw4", "ll", "sg"],
  onChange 
}: DictionarySelectorProps) {
  const [selectedDicts, setSelectedDicts] = useState<string[]>(selectedDictionaries);

  useEffect(() => {
    setSelectedDicts(selectedDictionaries);
  }, [selectedDictionaries]);

  const toggleDictionary = (id: string) => {
    const newSelection = selectedDicts.includes(id)
      ? selectedDicts.filter(d => d !== id)
      : [...selectedDicts, id];
    
    setSelectedDicts(newSelection);
    onChange?.(newSelection);
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="text-lg font-semibold mb-3">Select Dictionaries</h3>
      <div className="space-y-2">
        {dictionaries.map(dict => (
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