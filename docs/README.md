# Mawrid Reader Documentation

## Overview

Mawrid Reader is a sophisticated web-based Arabic dictionary application that solves a fundamental challenge: **how to make scanned dictionary pages searchable**. Traditional scanned dictionaries are essentially collections of images - you can view them, but you cannot search within them. Mawrid Reader bridges this gap by implementing a clever indexing system that maps Arabic roots and words to specific page numbers in scanned dictionaries.

### The Problem It Solves

Arabic dictionaries, especially classical ones, are often available only as scanned books. These scans preserve the original typography and layout but lose all searchability. Students and researchers must manually flip through hundreds of pages to find a single word. Mawrid Reader transforms these static image collections into dynamic, searchable resources.

### Key Features

- **Multi-Dictionary Search**: Search across 70+ Arabic dictionaries simultaneously
- **Dual Search Methods**: Supports both root-based (traditional Arabic) and alphabetical search
- **Smart Transliteration**: Type in English letters and automatically convert to Arabic
- **Offline Capable**: Download and use without internet connection
- **Mobile Friendly**: Swipe navigation and responsive design
- **Fast Navigation**: Keyboard shortcuts for power users

## Documentation Structure

### Core Concepts

1. **[System Architecture](architecture.md)**  
   Understand the high-level design and how components interact to deliver search results from scanned pages.

2. **[Search System](search-system.md)**  
   Deep dive into the search algorithms, including binary search for sorted dictionaries and pattern matching for others.

3. **[Transliteration](transliteration.md)**  
   Learn how Latin characters are converted to Arabic, including support for Buckwalter notation and Arabic chat alphabet.

4. **[Index Structure](index-structure.md)**  
   Explore how dictionary indexes map words to pages, enabling search functionality on image-based content.

### Configuration & Display

5. **[Dictionary Configuration](dictionary-configuration.md)**  
   How to configure dictionaries, create presets, and manage the compilation process.

6. **[Image Display System](image-display.md)**  
   Understanding page rendering, navigation, and the image URL structure.

### Development

7. **[Development Guide](development-guide.md)**  
   Step-by-step instructions for adding new dictionaries, creating indexes, and extending functionality.

8. **[Build Tools and Scripts](build-tools.md)**  
   Comprehensive guide to all shell scripts used for building, testing, and deploying Mawrid Reader.

## Quick Start

To use Mawrid Reader:

1. Open `index.html` in a web browser
2. Select dictionaries using the checkboxes
3. Type your search term (Arabic or transliterated)
4. Press Enter or click Search
5. Navigate results using arrow keys or swipe gestures

## Technical Overview

Mawrid Reader is built with:
- Pure HTML/CSS/JavaScript (no build process required)
- jQuery for DOM manipulation and UI
- Pre-generated indexes for each dictionary
- Configuration-driven architecture for easy dictionary addition

The genius of the system lies in its index files - simple JavaScript arrays where the array index corresponds to page numbers, and values are the last word appearing on that page. This enables binary search to quickly locate any word in thousands of pages.