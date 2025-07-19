# Mawrid Reader Next.js Modernization Plan

## Overview

This branch represents the modernization effort to transform Mawrid Reader from a jQuery-based application to a modern Next.js stack while preserving all existing functionality.

## Goals

1. **Modern Tech Stack**
   - Migrate from jQuery to React/Next.js
   - Use TypeScript for type safety
   - Implement modern state management (Context API/Zustand)
   - Use Tailwind CSS for styling

2. **Improved Performance**
   - Server-side rendering for initial page loads
   - Code splitting and lazy loading
   - Optimized image loading with Next.js Image component
   - API routes for data fetching

3. **Enhanced User Experience**
   - Responsive design with mobile-first approach
   - Progressive Web App capabilities
   - Improved search with real-time suggestions
   - Better accessibility

4. **Developer Experience**
   - Modern build tools
   - Hot module replacement
   - Component-based architecture
   - Automated testing

## Migration Strategy

### Phase 1: Setup and Infrastructure ✅
- [x] Initialize Next.js project
- [x] Set up TypeScript configuration
- [x] Configure Tailwind CSS
- [x] Set up ESLint and Prettier
- [x] Create project structure

### Phase 2: Core Components ✅
- [x] Create layout components
- [x] Build search interface component (SearchBox.tsx)
- [x] Implement dictionary selector (DictionarySelector.tsx)
- [x] Create page viewer component (PageViewer.tsx)
- [x] Build navigation controls (integrated in PageViewer)

### Phase 3: Data Layer ✅
- [x] Convert dictionary configurations to TypeScript (config.ts)
- [x] Extract dictionary indexes to TypeScript files (hw4, ll, sg)
- [x] Create API routes for search (/api/search, /api/suggestions, /api/dictionaries)
- [x] Implement binary search algorithm (binary-search.ts)
- [x] Set up image serving optimization (Cloudflare R2)

### Phase 4: Feature Parity
- [x] Implement transliteration system (lib/transliteration.ts)
- [ ] Add keyboard shortcuts
- [ ] Implement touch gestures
- [ ] Add offline support (PWA)
- [ ] Preserve URL-based state

### Phase 5: Enhancements
- [ ] Add dark mode
- [ ] Implement advanced search filters
- [ ] Add bookmarking system
- [ ] Create user preferences
- [ ] Add analytics

## Recent Progress

### Completed Tasks
1. **Infrastructure Setup** (Phase 1)
   - Created Next.js 15 app with TypeScript
   - Configured Tailwind CSS v3.4.0 (fixed v4 compatibility issue)
   - Set up basic project structure

2. **Dictionary Images** (Phase 3)
   - Successfully uploaded 5,673 dictionary images to Cloudflare R2
   - Configured rclone for efficient bulk uploads
   - Images stored at: `mawrid-dictionaries/mawridreader/[dict]/[dir]/[file].png`
   - Hans Wehr (hw4): 1,317 files
   - Lane's Lexicon (ll): 3,080 files
   - Steingass (sg): 1,276 files

3. **Initial Components** (Phase 2)
   - Created SearchBox component with transliteration hints
   - Built DictionarySelector with checkbox UI
   - Implemented basic transliteration library

### Completed Features
- [x] Core search functionality with binary search algorithm
- [x] Dictionary page viewer with zoom, rotate, and navigation
- [x] Multi-dictionary search with tabbed results
- [x] Transliteration support (Arabic and Buckwalter)
- [x] Cloudflare R2 integration for image hosting
- [x] API routes for search and suggestions
- [x] Modern UI with Tailwind CSS and shadcn/ui

### Next Steps
- [ ] Add keyboard shortcuts for navigation
- [ ] Implement URL-based state for bookmarking
- [ ] Add offline support (PWA)
- [ ] Create user preferences/settings
- [ ] Add search history
- [ ] Implement advanced search filters

## Technical Decisions

### Frontend
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State**: Zustand for global state, React Query for server state

### Backend
- **API**: Next.js API routes
- **Database**: Consider SQLite for indexes (optional)
- **Image Optimization**: Next.js Image with CDN

### Development
- **Package Manager**: pnpm
- **Testing**: Jest + React Testing Library
- **CI/CD**: GitHub Actions

## File Structure
```
/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── [locale]/          # Internationalization
│   └── components/        # React components
├── public/                # Static assets
├── lib/                   # Utility functions
├── types/                 # TypeScript types
├── data/                  # Dictionary data
└── tests/                 # Test files
```

## Backwards Compatibility

- Maintain URL structure for existing bookmarks
- Support all existing search parameters
- Keep keyboard shortcuts working
- Preserve existing dictionary configurations

## Next Steps

1. Create initial Next.js application
2. Port search functionality
3. Implement basic UI components
4. Test with subset of dictionaries
5. Gradually migrate features

## Notes

- Original jQuery code remains in main branch
- This modernization preserves all existing features
- Focus on incremental migration
- Maintain backwards compatibility where possible