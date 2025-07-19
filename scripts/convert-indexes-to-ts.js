#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Convert JSON index to TypeScript
function convertToTypeScript(dictId, jsonFile) {
  const indexData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  
  // Build TypeScript content
  let content = `/**
 * ${getDictName(dictId)} Dictionary Index
 * Maps page numbers to the last root word on that page
 * Total pages: ${indexData.length}
 */

export const ${dictId}Index: string[] = [
`;

  // Add each entry
  indexData.forEach((value, index) => {
    if (value === null) {
      content += `  "", // ${index}\n`;
    } else {
      // Escape any quotes in the Arabic text
      const escaped = value.replace(/"/g, '\\"');
      content += `  "${escaped}", // ${index}\n`;
    }
  });

  content += '];\n';
  
  // Write to file
  const outputPath = path.join(__dirname, '..', 'lib', 'dictionaries', `${dictId}-index.ts`);
  fs.writeFileSync(outputPath, content);
  
  console.log(`Created ${outputPath}`);
}

function getDictName(dictId) {
  const names = {
    'hw4': 'Hans Wehr 4th Edition',
    'll': "Lane's Lexicon",
    'sg': 'Steingass'
  };
  return names[dictId] || dictId;
}

// Convert all three dictionaries
convertToTypeScript('hw4', 'hw4-index.json');
convertToTypeScript('ll', 'll-index.json');
convertToTypeScript('sg', 'sg-index.json');

// Clean up JSON files
fs.unlinkSync('hw4-index.json');
fs.unlinkSync('ll-index.json');
fs.unlinkSync('sg-index.json');

console.log('Conversion complete!');