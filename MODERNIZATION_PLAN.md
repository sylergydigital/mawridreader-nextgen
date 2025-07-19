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

### Phase 1: Setup and Infrastructure
- [ ] Initialize Next.js project
- [ ] Set up TypeScript configuration
- [ ] Configure Tailwind CSS
- [ ] Set up ESLint and Prettier
- [ ] Create project structure

### Phase 2: Core Components
- [ ] Create layout components
- [ ] Build search interface component
- [ ] Implement dictionary selector
- [ ] Create page viewer component
- [ ] Build navigation controls

### Phase 3: Data Layer
- [ ] Convert dictionary configurations to JSON
- [ ] Create API routes for search
- [ ] Implement index loading system
- [ ] Set up image serving optimization

### Phase 4: Feature Parity
- [ ] Implement transliteration system
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