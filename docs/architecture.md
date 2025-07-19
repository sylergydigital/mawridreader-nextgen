# System Architecture

## Overview

Mawrid Reader is a client-side web application that transforms scanned dictionary pages into searchable resources. The architecture is elegantly simple yet powerful, requiring no server-side processing while handling complex Arabic text search across multiple dictionaries.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        User Interface                        │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ Search Box  │  │ Dict Select  │  │  Page Display   │   │
│  └──────┬──────┘  └──────┬───────┘  └────────┬────────┘   │
│         │                 │                    │            │
├─────────┴─────────────────┴────────────────────┴────────────┤
│                     mawrid-app.js                           │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │   Search    │  │ Transliter-  │  │     Page        │   │
│  │   Engine    │  │    ation     │  │   Navigation    │   │
│  └──────┬──────┘  └──────┬───────┘  └────────┬────────┘   │
│         │                 │                    │            │
├─────────┴─────────────────┴────────────────────┴────────────┤
│                      Data Layer                             │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │   Config    │  │    Index     │  │     Image       │   │
│  │   Files     │  │    Files     │  │     Files       │   │
│  └─────────────┘  └──────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. User Interface Layer

**Search Interface**
- Text input with autocomplete
- Real-time transliteration preview
- Multi-dictionary result display

**Dictionary Selection**
- Checkbox-based dictionary selection
- Language preset buttons
- Visual dictionary grouping

**Page Display**
- Image viewer for scanned pages
- Text display for digital content
- Navigation controls

### 2. Application Logic (mawrid-app.js)

**Search Engine**
- `do_search()`: Main search orchestrator
- `binarySearch()`: For alphabetically sorted dictionaries
- `plainSearch()`: For non-alphabetical dictionaries
- `make_suggestions()`: Fuzzy matching system

**Transliteration Module**
- `buckwalter()`: Buckwalter-to-Arabic conversion
- Custom transliteration rules for common patterns
- Arabic normalization (handling alif variations)

**Navigation System**
- Keyboard shortcut handling
- Touch gesture support
- URL hash state management

### 3. Data Layer

**Configuration Files**
- Dictionary metadata (name, color, layout)
- Index references
- Display parameters

**Index Files**
- JavaScript arrays mapping positions to words
- Custom functions for special dictionaries
- Pre-generated and optimized

**Image Storage**
- External repository structure
- Organized by dictionary and page range
- PNG format for quality

## Data Flow

### Search Flow

```
User Input
    ↓
Transliteration (if needed)
    ↓
For Each Selected Dictionary:
    ↓
    ├─→ Binary Search (if sorted)
    │       ↓
    │   Find Page Number
    │
    └─→ Plain Search (if unsorted)
            ↓
        Pattern Match
            ↓
Update Display with Results
```

### Page Loading Flow

```
Page Number Determined
    ↓
Calculate Image URL:
    ../aa-data/img/{dict_id}/{range}/{page}.png
    ↓
Update DOM Elements
    ↓
Browser Loads Images
    ↓
Update Navigation State
```

## Key Design Principles

### 1. **Client-Side Only**
All processing happens in the browser. No server required beyond static file hosting.

### 2. **Index-Based Search**
Pre-generated indexes enable fast search without OCR or text extraction.

### 3. **Configuration-Driven**
New dictionaries added through configuration without code changes.

### 4. **Progressive Enhancement**
Works on basic browsers, enhanced features for modern ones.

### 5. **Stateless Design**
All state stored in URL hash for bookmarking and sharing.

## File Structure

```
/
├── index.html              # Main entry point
├── mawrid-app.js          # Core application logic
├── mawrid-configs.js      # Compiled configurations
├── mawrid-indexes.js      # Compiled indexes
├── jslib/                 # JavaScript libraries
├── mr-*-conf.js          # Individual configurations
├── mr-*-indexes.js       # Individual index files
└── ../aa-data/img/       # External image repository
```

## Performance Optimizations

1. **Lazy Loading**: Only load images when needed
2. **Index Compilation**: Multiple indexes compiled into single file
3. **Binary Search**: O(log n) search complexity
4. **Caching**: Browser caches images automatically
5. **Minification**: Indexes can be minified for production

## Scalability

The architecture scales well because:
- Adding dictionaries only requires new index/config files
- Search performance independent of dictionary count
- Image storage can be distributed/CDN-hosted
- No server-side bottlenecks

## Security Considerations

- No user data stored
- No server communication (except image loading)
- URL parameters sanitized
- Static files only - no dynamic execution