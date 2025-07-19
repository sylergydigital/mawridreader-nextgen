# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mawrid Reader is a web-based Arabic dictionary viewer that displays scanned dictionary pages and provides search functionality across multiple Arabic dictionaries. It supports both root-based and alphabetical search methods.

## Key Commands

### Building/Compiling Configurations
```bash
./Attic/compile-configs.sh
```
This compiles all individual configuration files (mr-*-conf.js) into a single mawrid-configs.js file.

### Other Build Scripts
```bash
./check-indexes.sh              # Verify dictionary indexes are properly sorted
./Attic/minify-indexes.sh      # Minify index files for production
./Attic/aa-update-zip.sh       # Create distribution zip for offline use
```

### Running the Application
Open `index.html` or `mawrid.html` directly in a web browser. No build process required.

### URL Parameters
- `#conf=aa` - Arabic Almanac (root-based dictionaries)
- `#conf=mr` - Mawrid (alphabetical dictionaries)
- `#conf=mh` - Mabhath ul Talib (text-based dictionaries)
- `#q=searchterm` - Direct search query
- `#bwq=buckwalter` - Buckwalter transliteration search

## Architecture Overview

### Core Application Flow
1. **mawrid.html** - Main HTML entry point that loads all dependencies
2. **mawrid-app.js** - Core application logic handling:
   - Dictionary selection and switching
   - Search functionality (both Arabic and transliterated input)
   - Page navigation and display
   - Mobile gestures and keyboard shortcuts
3. **mawrid-configs.js** - Compiled configuration containing all dictionary definitions
4. **mawrid-indexes.js** - Search indexes for all dictionaries

### Key Components

**Configuration System**: Each dictionary collection has its own configuration file (e.g., mr-aa-conf.js) that defines:
- Available dictionaries with metadata
- Search index mappings
- Display settings

**Search System**: 
- Supports Arabic script and Roman transliteration
- Uses pre-built indexes stored in index files
- Handles both root-based and alphabetical lookups

**Page Display**:
- Dictionary pages are PNG images stored in external repository
- Image paths follow pattern: `../aa-data/img/{dict_id}/{page_number}.png`
- Navigation via keyboard, buttons, or swipe gestures

### Important Patterns

1. **jQuery-centric**: All DOM manipulation and event handling uses jQuery
2. **Hash-based routing**: Application state managed via URL hash changes
3. **Configuration-driven**: New dictionaries added by creating configuration entries
4. **No build step**: Direct browser execution of JavaScript files

### File Organization

**Configuration Files (before compilation)**:
- `mr-aa-conf.js` + `mr-aa-indexes.js` - Arabic Almanac dictionaries
- `mr-mr-conf.js` + `mr-mr-indexes.js` - Mawrid dictionaries
- `mr-mh-conf.js` + `mr-mh-indexes.js` - Mabhath ul Talib dictionaries
- Special index files: `mr-aa-hw3-index.js`, `mr-aa-hw5-index.js` for Hans Wehr editions

**Image Storage**:
- External repository at `../aa-data/img/{dict_id}/{page_range}/{page}.png`
- Page ranges organized in subdirectories (e.g., /100/, /200/)
- Text content in `text/` directory for text-based dictionaries

### Development Notes

- When adding new dictionaries, create configuration in appropriate mr-*-conf.js file, then run compile-configs.sh
- Development features enabled when hostname is "localhost" or "abd.ejtaal.net"
- Version number stored in mawrid-app.js (search for "var ver")
- Indexes can be minified for production using `./Attic/minify-indexes.sh`
- Application supports offline use - create distribution with `./Attic/aa-update-zip.sh`