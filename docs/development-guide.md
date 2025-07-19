# Development Guide

## Overview

This guide provides step-by-step instructions for developers who want to extend Mawrid Reader by adding new dictionaries, creating custom features, or contributing to the project.

## Development Environment Setup

### Prerequisites

- Web browser (Chrome/Firefox/Safari)
- Text editor (VS Code recommended)
- Basic command line tools (bash)
- Local web server (optional, for testing)

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/username/mawrid-reader.git
   cd mawrid-reader
   ```

2. **Set up image repository**
   ```bash
   # Images are stored separately
   cd ..
   git clone https://github.com/username/aa-data.git
   ```

3. **Test the application**
   ```bash
   # Open directly in browser
   open index.html
   
   # Or use a local server
   python -m http.server 8000
   # Navigate to http://localhost:8000
   ```

## Adding a New Dictionary

### Step 1: Prepare the Dictionary Images

1. **Scan or obtain page images**
   - Resolution: 150-200 DPI
   - Format: PNG (preferred) or JPEG
   - Naming: Sequential numbers (1.png, 2.png, etc.)

2. **Organize images by directory**
   ```
   ../aa-data/img/newdict/
   ├── 100/    # Pages 1-199
   ├── 200/    # Pages 200-299
   └── 300/    # Pages 300-399
   ```

3. **Optimize images**
   ```bash
   # Batch optimize PNGs
   for img in *.png; do
       optipng -o5 "$img"
   done
   ```

### Step 2: Create the Index File

1. **Manual index creation**
   ```javascript
   // mr-aa-newdict-index.js
   var newdict = [
       "",           // Page 0 (always empty)
       "آب",         // Last word on page 1
       "آبادان",     // Last word on page 2
       "آبار",       // Last word on page 3
       // ... continue for all pages
   ];
   ```

2. **Semi-automated approach**
   ```bash
   # Extract last visible word from each page
   # Requires manual verification
   for page in {1..500}; do
       echo "Page $page: "
       # Manual inspection needed here
   done > index.txt
   ```

3. **Verify alphabetical order**
   ```bash
   # Check if index is properly sorted
   ./check-indexes.sh newdict
   ```

### Step 3: Add Dictionary Configuration

1. **Edit configuration file**
   ```javascript
   // In mr-aa-conf.js (or appropriate collection)
   var books = {
       // ... existing dictionaries
       "newdict": {
           "name": "New Arabic Dictionary",
           "color": "Steelblue",
           "index": newdict,
           "direction": "rtl",
           "columns": "2",
           "offset": 15,      // Front matter pages
           "startpage": 16,   // First content page
           "image-prefix": "newdict"
       }
   };
   ```

2. **Add to presets**
   ```javascript
   var presets = {
       "default": { 
           "name": "Default", 
           "order": "ll,ha,la,newdict"  // Add to default
       },
       "english": { 
           "name": "English", 
           "order": "ll,ha,newdict"     // Add to English preset
       }
   };
   ```

### Step 4: Include Index in Compilation

1. **Update index compilation**
   ```javascript
   // In mr-aa-indexes.js
   var all_indexes = {
       // ... existing indexes
       "newdict": newdict
   };
   ```

2. **Run compilation script**
   ```bash
   ./Attic/compile-configs.sh
   ```

### Step 5: Test the Dictionary

1. **Basic functionality test**
   - Open application
   - Select new dictionary
   - Search for known terms
   - Navigate pages

2. **Edge case testing**
   ```javascript
   // Test these scenarios:
   - First page (boundary)
   - Last page (boundary)
   - Missing pages (error handling)
   - Search terms at beginning/middle/end of index
   ```

## Creating Custom Features

### 1. Custom Search Function

For dictionaries with special requirements:

```javascript
// Custom search for etymology dictionary
function etymologySearch(searchTerm, index) {
    // Search for word roots across languages
    var results = [];
    
    // Check Arabic root
    var arabicRoot = extractRoot(searchTerm);
    results.push(binarySearch(arabicRoot, index));
    
    // Check loan words
    var possibleLoans = generateLoanVariants(searchTerm);
    possibleLoans.forEach(variant => {
        results.push(binarySearch(variant, index));
    });
    
    return results.filter(r => r > 0);
}

// Register custom search
books["etymology"]["custom-search"] = etymologySearch;
```

### 2. Custom Page Display

For non-standard layouts:

```javascript
// Multi-page spread display
function displaySpread(book, leftPage) {
    var rightPage = leftPage + 1;
    
    $("#" + book + "_left").attr('src', get_img_url(book, leftPage));
    $("#" + book + "_right").attr('src', get_img_url(book, rightPage));
}
```

### 3. Enhanced Navigation

Add specialized navigation:

```javascript
// Jump to letter sections
function jumpToLetter(book, letter) {
    var targetIndex = findFirstOccurrence(letter, books[book]["index"]);
    books[book]["wanted"] = targetIndex;
    display_images();
}

// Add UI controls
$('<button>').text('ا').click(() => jumpToLetter('dict', 'ا'));
```

## Working with Text Dictionaries

### 1. Preparing Text Content

```bash
# Directory structure
text/dictname/
├── ا/
│   ├── ابد.txt
│   ├── ابر.txt
│   └── ...
├── ب/
│   ├── بحر.txt
│   └── ...
```

### 2. Text Index Format

```javascript
var text_index = {
    "ابد": "ا/ابد.txt",
    "ابر": "ا/ابر.txt",
    "بحر": "ب/بحر.txt",
    // ...
};
```

### 3. Configuration

```javascript
"textdict": {
    "name": "Text Dictionary",
    "type": "text",
    "index": text_index,
    "text-prefix": "dictname",
    "direction": "rtl",
    "columns": "1"
}
```

## Debugging and Testing

### 1. Enable Debug Mode

```javascript
// In mawrid-app.js
var DEBUG = true;

function debug(msg) {
    if (DEBUG) {
        console.log('[DEBUG]', msg);
    }
}
```

### 2. Common Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Dictionary not appearing | Config not compiled | Run compile-configs.sh |
| Wrong pages shown | Index offset error | Verify offset value |
| Search returns nothing | Index not sorted | Check alphabetical order |
| Images not loading | Wrong path/prefix | Verify image-prefix |

### 3. Browser Developer Tools

```javascript
// Useful console commands for debugging

// Check loaded dictionaries
console.log(books);

// Test search function
console.log(binarySearch("كتاب", books["ll"]["index"]));

// Verify index length
console.log(books["ll"]["index"].length);

// Check current state
console.log(books["ll"]["current"], books["ll"]["wanted"]);
```

## Performance Optimization

### 1. Index Minification

```bash
# Minify index files for production
./Attic/minify-indexes.sh

# Result: mr-aa-indexes.min.js
```

### 2. Lazy Loading

```javascript
// Load dictionary only when selected
function loadDictionaryOnDemand(dictId) {
    if (!books[dictId]["index"]) {
        $.getScript('indexes/' + dictId + '-index.js', function() {
            books[dictId]["index"] = window[dictId];
            enableDictionary(dictId);
        });
    }
}
```

### 3. Image Optimization

```bash
# Batch process images
#!/bin/bash
for img in *.png; do
    # Resize if too large
    convert "$img" -resize "1200x1600>" "$img"
    
    # Optimize
    optipng -o5 "$img"
done
```

## Contributing to the Project

### 1. Code Style

- Use consistent indentation (2 spaces)
- Comment complex logic
- Follow existing naming conventions
- Test across browsers

### 2. Submitting Changes

1. Fork the repository
2. Create feature branch
3. Make changes with clear commits
4. Test thoroughly
5. Submit pull request

### 3. Documentation

- Update relevant docs
- Add inline comments
- Include usage examples
- Document new features

## Deployment

### 1. Production Build

```bash
# Compile all configurations
./Attic/compile-configs.sh

# Minify indexes
./Attic/minify-indexes.sh

# Create distribution
./Attic/aa-update-zip.sh
```

### 2. Hosting Requirements

- Static file hosting only
- CORS headers for image loading
- Sufficient bandwidth for images
- Optional: CDN for images

### 3. Offline Distribution

```bash
# Create offline package
zip -r mawrid-offline.zip \
    *.html \
    *.js \
    *.css \
    jslib/ \
    ../aa-data/img/
```

## Advanced Topics

### 1. Creating Index Generation Tools

```python
# Python script for OCR-based index creation
import pytesseract
from PIL import Image
import arabic_reshaper

def extract_last_word(image_path):
    img = Image.open(image_path)
    text = pytesseract.image_to_string(img, lang='ara')
    lines = text.strip().split('\n')
    last_line = lines[-1] if lines else ""
    words = last_line.split()
    return words[-1] if words else ""
```

### 2. Implementing New Search Algorithms

```javascript
// Fuzzy search implementation
function fuzzySearch(term, index, threshold = 0.8) {
    var results = [];
    
    index.forEach((entry, idx) => {
        var similarity = calculateSimilarity(term, entry);
        if (similarity >= threshold) {
            results.push({ page: idx, score: similarity });
        }
    });
    
    return results.sort((a, b) => b.score - a.score);
}
```

### 3. Analytics Integration

```javascript
// Track usage patterns
function trackSearch(term, results) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'search', {
            'search_term': term,
            'results_count': results.length,
            'dictionaries': Object.keys(books).filter(b => !books[b]["should_hide"])
        });
    }
}
```

## Resources

- [Arabic Unicode Reference](https://en.wikipedia.org/wiki/Arabic_script_in_Unicode)
- [Buckwalter Transliteration](https://en.wikipedia.org/wiki/Buckwalter_transliteration)
- [OCR for Arabic Text](https://github.com/tesseract-ocr/tesseract)
- [Image Optimization Tools](https://imageoptim.com/)