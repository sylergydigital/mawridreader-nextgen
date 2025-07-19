#!/usr/bin/env node

// Script to extract dictionary indexes from mawrid-configs.js
const fs = require('fs');
const path = require('path');

// Read the original config file
const configPath = path.join(__dirname, '..', 'original-app', 'mawrid-configs.js');
const configContent = fs.readFileSync(configPath, 'utf8');

// Extract specific dictionary index
function extractIndex(dictId) {
  const pattern = new RegExp(`all_indexes\\['${dictId}'\\]\\[(\\d+)\\]="([^"]*)"`, 'g');
  const matches = [...configContent.matchAll(pattern)];
  
  const index = [];
  matches.forEach(match => {
    const position = parseInt(match[1]);
    const value = match[2];
    index[position] = value;
  });
  
  return index;
}

// Extract hw4, ll, and sg indexes
const hw4Index = extractIndex('hw4');
const llIndex = extractIndex('ll');
const sgIndex = extractIndex('sg');

console.log(`hw4 index length: ${hw4Index.length}`);
console.log(`ll index length: ${llIndex.length}`);
console.log(`sg index length: ${sgIndex.length}`);

// Save to temporary files for inspection
fs.writeFileSync('hw4-index.json', JSON.stringify(hw4Index, null, 2));
fs.writeFileSync('ll-index.json', JSON.stringify(llIndex, null, 2));
fs.writeFileSync('sg-index.json', JSON.stringify(sgIndex, null, 2));

console.log('Indexes extracted to JSON files');