# Index Structure Documentation

## Overview

The index system is what makes Mawrid Reader's search functionality possible. Each dictionary has an index file that maps searchable content to page numbers, enabling rapid lookup in scanned books.

## Basic Index Structure

### Simple Array Index

Most dictionaries use a simple array structure where:
- Array index = page number
- Array value = last word/root on that page

```javascript
var dict_index = [
    "",           // Page 0 (unused)
    "أب",         // Page 1 ends with أب
    "أبد",        // Page 2 ends with أبد
    "أبو",        // Page 3 ends with أبو
    "أتى",        // Page 4 ends with أتى
    // ... continues for all pages
];
```

### How Search Works

When searching for "أبن":
1. Binary search compares with array values
2. Finds "أبن" would be between "أبد" (page 2) and "أبو" (page 3)
3. Returns page 3 as the likely location

## Advanced Index Structures

### 1. Multi-Value Indexes

Some pages contain multiple important entries:

```javascript
var detailed_index = [
    "",
    "أب|أبا|أبب",     // Page 1 has multiple entries
    "أبد|أبر|أبض",    // Page 2
    // ...
];
```

### 2. Custom Function Indexes

Hans Wehr dictionaries use custom functions for complex mappings:

```javascript
// From mr-aa-hw5-index.js
var articles = [
    'ابد', // حرف الألف (صفحة ١)
    'ابط',
    'ابو',
    // ...
];

hw5_urltrigger = function(searchfor) {
    // Custom logic to handle special cases
    var page = customSearch(searchfor, articles);
    return generateUrl(page);
};
```

### 3. Text Dictionary Indexes

For text-based dictionaries, indexes map to file paths:

```javascript
var text_index = {
    "كتب": "text/dict1/ك/كتب.txt",
    "قرأ": "text/dict1/ق/قرأ.txt",
    // ...
};
```

## Index File Format

### Standard Index File Structure

```javascript
// mr-{project}-{dict}-index.js
var {dict_id} = [
    "",  // Always starts with empty string for page 0
    "first_root",
    "second_root",
    // ... one entry per page
];

// Optional: Custom search function
{dict_id}_urltrigger = function(searchfor) {
    // Custom search logic
};
```

### Compiled Index Structure

Multiple indexes compiled into single file:

```javascript
// mawrid-indexes.js
var all_indexes = {
    "dict1": dict1_index,
    "dict2": dict2_index,
    "dict3": dict3_index,
    // ...
};
```

## Creating Indexes

### 1. Manual Index Creation

For small dictionaries, indexes can be created manually:

1. Go through each page
2. Identify the last complete entry
3. Add to array at corresponding position

### 2. Semi-Automated Creation

Using helper scripts:

```bash
# Extract last word from each page using OCR
for page in *.png; do
    tesseract $page - | tail -1 >> index.txt
done

# Convert to JavaScript array
awk '{print "\""$0"\","}' index.txt > index.js
```

### 3. Verification

The `check-indexes.sh` script verifies index integrity:

```bash
./check-indexes.sh
# Checks:
# - Alphabetical ordering
# - No missing entries
# - Proper formatting
```

## Index Optimization

### 1. Minification

Reduce file size for production:

```javascript
// Before minification
var dict = [
    "",
    "ابد",
    "ابط",
];

// After minification
var dict=["","ابد","ابط"];
```

### 2. Compression Techniques

- Remove redundant prefixes
- Use shortened variable names
- Combine similar indexes

### 3. Loading Strategy

```javascript
// Lazy loading for large indexes
if (needed_dictionaries.includes('huge_dict')) {
    loadScript('mr-aa-huge-index.js');
}
```

## Special Cases

### 1. Multi-Volume Dictionaries

Indexes span multiple volumes:

```javascript
var multivolume_index = {
    "vol1": ["", "ابد", "اخر"],
    "vol2": ["ب", "بحر", "بين"],
    "vol3": ["ت", "تمر", "توت"],
};
```

### 2. Root-Based vs Alphabetical

Root-based dictionaries require special handling:

```javascript
// Root-based index
var root_index = [
    "",
    "ءبد",  // Root form
    "ءبق",
    "ءبل",
];

// Alphabetical index  
var alpha_index = [
    "",
    "آباء",  // Surface form
    "آبار",
    "آباط",
];
```

### 3. Cross-References

Some entries reference other locations:

```javascript
var xref_index = [
    "",
    "ابد -> see بدء",
    "ابر",
];
```

## Index Metadata

Additional information stored with indexes:

```javascript
var dict_metadata = {
    "index": dict_index,
    "type": "root_based",
    "language": "ar",
    "direction": "rtl",
    "total_pages": 1435,
    "entries_per_page": "variable"
};
```

## Performance Considerations

### 1. Memory Usage

- Simple array: ~4 bytes per entry
- 1000-page dictionary: ~4KB
- All indexes loaded: ~500KB total

### 2. Search Speed

- Binary search: O(log n)
- 1000 pages: max 10 comparisons
- Sub-millisecond search time

### 3. Loading Time

- Initial load: all indexes
- Alternative: lazy load on demand
- Trade-off: startup time vs search delay

## Troubleshooting

### Common Issues

1. **Off-by-one errors**: Index doesn't match actual pages
2. **Encoding issues**: Arabic text corrupted
3. **Missing entries**: Gaps in index cause search failures
4. **Sort order**: Non-alphabetical entries break binary search

### Debugging

```javascript
// Add debug output
console.log("Searching for:", searchTerm);
console.log("Index length:", index.length);
console.log("Found at position:", position);
console.log("Page content:", index[position]);
```

## Future Enhancements

1. **Incremental Indexes**: Only load needed portions
2. **Fuzzy Indexes**: Handle OCR errors in index creation
3. **Semantic Indexes**: Group related terms
4. **Full-Text Indexes**: Search within page content