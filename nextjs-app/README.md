# Mawrid Reader NextGen - Application

This is the Next.js application directory for the modernized Mawrid Reader, focusing on Arabic-English dictionaries.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features Implemented

- ✅ Basic Next.js setup with TypeScript
- ✅ Tailwind CSS for styling
- ✅ Search box component with transliteration support
- ✅ Dictionary selector component
- ✅ Transliteration utilities
- 🚧 Search functionality (in progress)
- 🚧 Dictionary page display (planned)
- 🚧 API routes for data fetching (planned)

## Project Structure

```
nextjs-app/
├── app/                    # Next.js app directory
│   ├── api/               # API routes (to be implemented)
│   ├── components/        # Page-specific components
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Shared components
│   ├── SearchBox.tsx      # Search input component
│   └── DictionarySelector.tsx # Dictionary selection
├── lib/                   # Utility functions
│   └── transliteration.ts # Arabic transliteration
├── public/                # Static assets
├── types/                 # TypeScript types
└── data/                  # Dictionary data (to be added)
```

## Development

To add new features:

1. Create components in `components/` directory
2. Add utility functions in `lib/`
3. Define types in `types/`
4. Create API routes in `app/api/`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Next Steps

1. Implement search functionality with dictionary indexes
2. Create page viewer component for displaying results
3. Add API routes for fetching dictionary data
4. Implement keyboard shortcuts
5. Add PWA support for offline usage